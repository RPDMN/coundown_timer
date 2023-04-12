// THis will tell what function to perform once the timer hits zero
export const ONCE_TIMER_ENDS = Object.freeze({
  UNPUBLISH_TIMER: "UNPUBLISH_TIMER",
  SHOW_CUSTOM_TITLE: "SHOW_CUSTOM_TITLE",
  DO_NOTHING: "DO_NOTHING",
});

const onceItEndsTimerOptions = [
  { label: "Unpublish timer", value: ONCE_TIMER_ENDS.UNPUBLISH_TIMER },
  { label: "Show custom title", value: ONCE_TIMER_ENDS.SHOW_CUSTOM_TITLE },
  { label: "Do nothing", value: ONCE_TIMER_ENDS.DO_NOTHING },
];

export default onceItEndsTimerOptions;
