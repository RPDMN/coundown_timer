import { createSlice } from "@reduxjs/toolkit";

const timerListSlice = createSlice({
  name: "timerList",
  initialState: {
    user: {},
    timerList: [
      // {
      //   _id: "6426f334c6ec9912505ec860",
      //   timerName: "First CountDown Counter",
      //   startDate: "2023-03-31",
      //   endDate: "2023-04-10",
      //   fixedMinutes: "120",
      //   timerType: "END_DATE",
      //   postion: "PRODUCTS_PAGE",
      //   isPublished: true,
      // },
    ],
  },

  reducers: {
    setTimerList: (state, action) => {
      state.timerList = action.payload;
    },
  },
});

export default timerListSlice.reducer;
export const { setTimerList } = timerListSlice.actions;
