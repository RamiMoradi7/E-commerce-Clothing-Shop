import { configureStore } from "@reduxjs/toolkit";
import { AppState } from "./AppState";
import { authReducers } from "./AuthSlice";
import { cartReducers } from "./CartSlice";
import { categoryReducer } from "./CategoriesSlice";
import { productsReducers } from "./ProductsSlice";
import { audienceReducer } from "./AudienceSlice";
import { brandReducer } from "./BrandsSlice";

export const appStore = configureStore<AppState>({
  reducer: {
    user: authReducers,
    result: productsReducers,
    audiences: audienceReducer,
    cart: cartReducers,
    categories: categoryReducer,
    brands: brandReducer,
  },
});
