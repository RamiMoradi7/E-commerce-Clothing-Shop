import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductModel } from "../Models/ProductModel";

export interface ProductsResponse {
  products: ProductModel[];
  total: number;
  currentPage: number;
  currentAmount: number;
  totalPages: number;
}

export interface ProductsState {
  result: ProductsResponse;
  loading: boolean;
}

const initialState: ProductsState = {
  result: {
    products: [],
    currentPage: 0,
    total: 0,
    totalPages: 0,
    currentAmount: 0,
  },
  loading: true,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    initAll(state, action: PayloadAction<ProductsResponse>) {
      state.result = action.payload;
      state.loading = false;
    },

    addProduct(state, action: PayloadAction<ProductModel>) {
      state.result.products.push(action.payload);
      state.loading = false;
    },
    updateProduct(state, action: PayloadAction<ProductModel>) {
      const index = state.result.products.findIndex(
        (product) => product._id === action.payload._id
      );
      if (index !== -1) {
        state.result.products[index] = action.payload;
      }
      state.loading = false;
    },
    deleteProduct(state, action: PayloadAction<string>) {
      state.result.products = state.result.products.filter(
        (product) => product._id !== action.payload
      );
      state.loading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const productActions = productsSlice.actions;
export const productsReducers = productsSlice.reducer;
