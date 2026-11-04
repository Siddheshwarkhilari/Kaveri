import { Fragment } from "react";
import { m, type Variants } from "motion/react";
import { ease } from "@/lib/motion";

const riseVariants: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.75, ease: ease.out } },
};

interface WordRevealProps {
  text: string;
  /** Per-word variants; driven by a parent motion element's `hidden` / `visible` labels. */
  variants?: Variants;
}

/** Splits text into words that rise from behind a mask, one after another. */
export default function WordReveal({ text, variants = riseVariants }: WordRevealProps) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top">
            <m.span variants={variants} className="inline-block">
              {word}
            </m.span>
          </span>{" "}
        </Fragment>
      ))}
    </>
  );
}
