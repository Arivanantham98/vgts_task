import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "cartSlice",
  initialState: {
    cartData: {
      productData: [],
      loading: true,
      userData: null,
      checkoutLoading: true,
    },
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartData.productData = action.payload;
      state.cartData.loading = false;
    },
    getUserData: (state, action) => {
      state.cartData.userData = action.payload;
    },
  },
});

export const { addToCart, getUserData } = slice.actions;

export default slice.reducer;
