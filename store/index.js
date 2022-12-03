import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/auth-slice";
import cartSlice from "./cart/cart-slice";

const store = configureStore({
  reducer: { auth: authSlice.reducer, cart: cartSlice.reducer },
});

export default store;
