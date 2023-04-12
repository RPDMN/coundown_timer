import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

import indexSlice from "./slices/indexSlice";
import { BACKEND_URL } from "../helpers/constant";
import { axiosInstance } from "../helpers/function";
import userTimerListSlice from "./slices/user.slice";
import timerBarExtraParamSlice from "./slices/timerBarExtraParamSlice";
import selectedTabSlice from "./slices/selectedTabSlice";

const store = configureStore({
  reducer: {
    index: indexSlice,
    user: userTimerListSlice,
    timerBarExtras: timerBarExtraParamSlice,
    selectedTabSlice,
  },
  middleware: [thunk.withExtraArgument(axiosInstance(BACKEND_URL))],
});

export default store;
