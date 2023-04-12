import { createSlice } from "@reduxjs/toolkit";
import TAB_TYPE from "../../helpers/tabs_enum";

const selectedTabSlice = createSlice({
  name: "selectedTab",
  initialState: {
    selectedTab: TAB_TYPE.CONTENT_TAB,
  },

  reducers: {
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
  },
});

export default selectedTabSlice.reducer;
export const { setSelectedTab } = selectedTabSlice.actions;
