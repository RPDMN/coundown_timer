import { createSlice } from "@reduxjs/toolkit";
import { getInitalTimerBarExtraCss } from "../../helpers/function";
import CALL_TO_ACTION_TYPE from "../../helpers/call_to_action";
import { TIMER_BAR_POSITION } from "../../helpers/timer_bar_position";
import { TIMER_BAR_POSITION_TYPE } from "../../helpers/timer_bar_position_type";

const timerBarExtraSlice = createSlice({
  name: "timerBarExtras",
  initialState: {
    callToAction: CALL_TO_ACTION_TYPE.BUTTON_ACTION,
    buttonText: "Show Now!",
    link: "",
    shouldDisplayCloseIcon: true,
    timerBarPosition: TIMER_BAR_POSITION.TOP_PAGE,
    isSticky: false,
    timerBarDisplayPositionType: TIMER_BAR_POSITION_TYPE.EVERY_PAGE,
    listOfCollectionForPosition: [],
    extraCss: {
      ...getInitalTimerBarExtraCss(),
    },
  },

  reducers: {
    setCallToAction: (state, action) => {
      state.callToAction = action.payload;
    },
    setButtonText: (state, action) => {
      state.buttonText = action.payload;
    },
    setLink: (state, action) => {
      state.link = action.payload;
    },
    setShouldDisplayCloseIcon: (state, action) => {
      state.shouldDisplayCloseIcon = action.payload;
    },
    setTimerBarPosition: (state, action) => {
      state.timerBarPosition = action.payload;
    },
    setIsSticky: (state, action) => {
      state.isSticky = action.payload;
    },
    setDisplayPositionType: (state, action) => {
      state.timerBarDisplayPositionType = action.payload;
    },
    setListOfCollectionForPosition: (state, action) => {
      state.listOfCollectionForPosition = action.payload;
    },
    setExtraStyle: (state, action) => {
      state.extraCss = {
        ...state.extraCss,
        ...action.payload,
      };
    },
    // setStyle: (state, action) => {
    //   state.css = {
    //     ...state.css,
    //     ...action.payload,
    //   };
    // },
    setInitialState: (state, action) => {
      state = { ...state, ...action.payload };
    },
  },
});

export default timerBarExtraSlice.reducer;
export const {
  setCallToAction,
  setButtonText,
  setLink,
  setShouldDisplayCloseIcon,
  setExtraStyle,
  setInitialState,
  setTimerBarPosition,
  setIsSticky,
  setDisplayPositionType,
  setListOfCollectionForPosition,
} = timerBarExtraSlice.actions;
