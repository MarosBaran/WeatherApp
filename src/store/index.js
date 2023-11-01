import { configureStore } from "@reduxjs/toolkit";
import fetchSlice from "./fetch-slice";
const store = configureStore({
  reducer: fetchSlice.reducer,
});

export default store;
