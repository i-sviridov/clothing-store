import { createSlice } from "@reduxjs/toolkit";
import reducersFunctions from "./favorites-reducer";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
    amount: 0,
  },
  reducers: reducersFunctions,
});

export default favoritesSlice;
export const favoritesActions = favoritesSlice.actions;
