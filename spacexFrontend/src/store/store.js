import { configureStore } from "@reduxjs/toolkit";
import launchesReducer from "../features/launchSlice";

const store = configureStore({
  reducer: {
    launches: launchesReducer,
  },
});

export default store;
