import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import mealApi from "./mealApi";
import cartSlice from "./cartSlice";

const reducer = combineReducers({
  mealApi,
  cartSlice,
});

const store = configureStore({
  reducer,
});

export default store;
