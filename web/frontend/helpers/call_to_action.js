// Frozen enum - Immutable
const CALL_TO_ACTION_TYPE = Object.freeze({
  NO_ACTION: "NO_ACTION",
  BUTTON_ACTION: "BUTTON_ACTION",
  ENTIRE_BAR_CLICKABLE: "ENTIRE_BAR_CLICKABLE",
});

export const callToActions = [
  { label: "No call to action", value: CALL_TO_ACTION_TYPE.NO_ACTION },
  { label: "Button", value: CALL_TO_ACTION_TYPE.BUTTON_ACTION },
  {
    label: "Make entire bar clickable",
    value: CALL_TO_ACTION_TYPE.ENTIRE_BAR_CLICKABLE,
  },
];

export default CALL_TO_ACTION_TYPE;
