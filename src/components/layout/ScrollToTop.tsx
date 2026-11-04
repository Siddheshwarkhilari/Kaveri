import { useEffect } from "react";
import { useLocation } from "wouter";

/** Client-side navigation keeps the old scroll position; start each page at the top. */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return null;
}
