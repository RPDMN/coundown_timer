import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { TIMER_TYPE } from "../../helpers/constant";
import { getInitialCSS, getInitialTimerBarCSS } from "../../helpers/function";
import { ONCE_TIMER_ENDS } from "../../helpers/once_timer_ends_function";
import TIMER_POSITION from "../../helpers/timer_position_enum";
import TIMER_POSITION_TYPE from "../../helpers/timer_position_type_enum";
import TIMER_STARTING_DATE_TYPE from "../../helpers/timer_starting_date_type_enum";

const isTopBarType = window.location.search.includes("top-bar");

const indexSlice = createSlice({
  name: "index",
  initialState: {
    timerId: "",
    name: "First CountDown Counter",
    title: "Hurry Up!",
    subHeading: "Sale ends in:",
    startDate: moment().format("YYYY-MM-DD"),
    startDateHours: moment().hour(),
    startDateMinutes: moment().minutes(),
    endDate: moment().add("days", 10).format("YYYY-MM-DD"), // Initial timer end is after 10 days
    endDateHours: moment().hour(),
    endDateMinutes: moment().minute(),
    minutesAdded: 120, // default is 120 minutes
    timerType: TIMER_TYPE.END_DATE,
    timerStatingDateType: TIMER_STARTING_DATE_TYPE.NOW,
    postion: TIMER_POSITION.PRODUCTS_PAGE,
    displayPositionType: TIMER_POSITION_TYPE.ALL_PRODUCTS,
    isPublished: false,
    onceTimerEnds: ONCE_TIMER_ENDS.UNPUBLISH_TIMER,
    onceTimerEndsCustomTitle: "",
    listOfProductsForPosition: [],
    shop: "",
    css: isTopBarType ? { ...getInitialTimerBarCSS() } : { ...getInitialCSS() },
  },

  reducers: {
    setTimerID: (state, action) => {
      state.timerId = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setSubheading: (state, action) => {
      state.subHeading = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setStartDateHours: (state, action) => {
      state.startDateHours = action.payload;
    },

    setStartDateMinutes: (state, action) => {
      state.startDateMinutes = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setEndDateHours: (state, action) => {
      state.endDateHours = action.payload;
    },
    setEndDateMinutes: (state, action) => {
      state.endDateMinutes = action.payload;
    },
    setMinutesAdded: (state, action) => {
      state.minutesAdded = action.payload;
    },
    setTimerType: (state, action) => {
      state.timerType = action.payload;
    },
    setTimerStatingDateType: (state, action) => {
      state.timerStatingDateType = action.payload;
    },
    setPostion: (state, action) => {
      state.postion = action.payload;
    },
    setDisplayPositionType: (state, action) => {
      state.displayPositionType = action.payload;
    },
    setPublished: (state, action) => {
      state.isPublished = action.payload;
    },
    setOnceTimerEnds: (state, action) => {
      state.onceTimerEnds = action.payload;
    },
    setOnceTimerEndsCustomTitle: (state, action) => {
      state.onceTimerEndsCustomTitle = action.payload;
    },
    setListOfProductsForPosition: (state, action) => {
      state.listOfProductsForPosition = action.payload;
    },
    setShop: (state, action) => {
      state.shop = action.payload;
    },
    setStyle: (state, action) => {
      state.css = {
        ...state.css,
        ...action.payload,
      };
    },

    setInitialState: (state, action) => {
      state = { ...state, ...action.payload };
    },
  },
});

export default indexSlice.reducer;
export const {
  setTimerID,
  setName,
  setTitle,
  setSubheading,
  setStartDate,
  setStartDateHours,
  setStartDateMinutes,
  setEndDate,
  setEndDateHours,
  setEndDateMinutes,
  setMinutesAdded,
  setTimerType,
  setTimerStatingDateType,
  setPostion,
  setDisplayPositionType,
  setPublished,
  setOnceTimerEnds,
  setListOfProductsForPosition,
  setStyle,
  setOnceTimerEndsCustomTitle,
  setShop,
  setInitialState,
} = indexSlice.actions;
