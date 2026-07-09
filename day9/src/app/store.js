import { configureStore } from "@reduxjs/toolkit";
import nameReducer from "../feautures/nameSlice";

export const store = configureStore({
  reducer: {
    names: nameReducer,
  },
});