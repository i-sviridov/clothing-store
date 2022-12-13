import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/auth-slice";
import cartSlice from "./cart/cart-slice";
import favoritesSlice from "./favorites/favorites-slice";
import productsSlice from "./products/products-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    favorites: favoritesSlice.reducer,
    products: productsSlice.reducer,
  },
});

export default store;
