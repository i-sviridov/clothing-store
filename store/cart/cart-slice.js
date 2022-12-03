import { createSlice } from "@reduxjs/toolkit";
import reducersFunctions from "./cart-reducers";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    cartSum: 0,
    isOpen: false,
  },
  reducers: reducersFunctions,
});

export default cartSlice;
export const cartActions = cartSlice.actions;
