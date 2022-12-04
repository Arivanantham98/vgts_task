import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRandomMealApi = () => async (dispatch) => {
  try {
    let response = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/search.php?f=k"
    );
    dispatch(getRandomMealApi(response.data));
  } catch (e) {
    return console.error(e.message);
  }
};

export const fetchRandomMealById =
  ({ id }) =>
  async (dispatch) => {
    try {
      let response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      dispatch(getRandomMealById(response.data));
    } catch (e) {
      return console.error(e.message);
    }
  };

export const fetchMealsBySearch =
  ({ term }) =>
  async (dispatch) => {
    try {
      let response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
      );
      dispatch(getSearchResults(response.data));
    } catch (e) {
      return console.error(e.message);
    }
  };

const slice = createSlice({
  name: "mealApi",
  initialState: {
    randomMealApi: {
      data: [],
      loading: true,
    },
    randomMeal: {
      data: [],
      loading: true,
    },
    searchData: {
      data: [],
      loading: true,
    },
  },
  reducers: {
    getRandomMealApi: (state, action) => {
      state.randomMealApi.data = action.payload.meals;
      state.randomMealApi.loading = false;
    },
    getRandomMealById: (state, action) => {
      state.randomMeal.data = action.payload.meals;
      state.randomMeal.loading = false;
    },
    clearRandomMeal: (state, action) => {
      state.randomMeal.data = [];
      state.randomMeal.loading = true;
    },
    getSearchResults: (state, action) => {
      state.searchData.data = action.payload.meals;
      state.searchData.loading = false;
    },
  },
});

export const {
  clearRandomMeal,
  getRandomMealApi,
  getRandomMealById,
  getSearchResults,
} = slice.actions;

export default slice.reducer;
