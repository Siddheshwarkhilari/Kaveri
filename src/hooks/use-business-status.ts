import { useEffect, useMemo, useState } from "react";
import { businessHours, weekDays } from "@/data/contact";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  weekday: "long",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export interface BusinessStatus {
  /** Today in IST, as an index into weekDays. */
  dayIndex: number;
  withinHours: boolean;
  /** When the current period ends, e.g. "until 18:00 IST". */
  detail: string;
}

export function getBusinessStatus(now: Date): BusinessStatus {
  const parts = formatter.formatToParts(now);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)?.value ?? "";
  const dayIndex = weekDays.findIndex((day) => day.name === part("weekday"));
  const minute = Number(part("hour")) * 60 + Number(part("minute"));
  const openToday = weekDays[dayIndex]?.open ?? false;
  const { openMinute, closeMinute, opensAt, closesAt } = businessHours;

  if (openToday && minute >= openMinute && minute < closeMinute) {
    return { dayIndex, withinHours: true, detail: `until ${closesAt} IST` };
  }
  if (openToday && minute < openMinute) {
    return { dayIndex, withinHours: false, detail: `opens today at ${opensAt} IST` };
  }
  // Only Sunday is closed, so after Saturday's close the next opening is Monday.
  const opening = weekDays[(dayIndex + 1) % weekDays.length].open ? "tomorrow" : weekDays[0].name;
  return { dayIndex, withinHours: false, detail: `opens ${opening} at ${opensAt} IST` };
}

/** The company's usual working hours compared with the time in India, kept current each minute. */
export function useBusinessStatus(): BusinessStatus {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return useMemo(() => getBusinessStatus(now), [now]);
}
