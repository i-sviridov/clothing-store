import { createSlice } from "@reduxjs/toolkit";
import reducersFunctions from "./products-reducer";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    category: "all-products",
    price: "no-sorting",
    currentPage: 1,
  },
  reducers: reducersFunctions,
});

export default productsSlice;
export const productsAction = productsSlice.actions;
