// Motion's animation features, split into their own chunk and loaded by <LazyMotion> after first paint.
// domMax (rather than domAnimation) is needed for layout animations such as the navbar's active pill.
export { domMax as default } from "motion/react";
