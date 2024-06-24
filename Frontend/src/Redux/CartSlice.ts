import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductModel } from "../Models/ProductModel";
import { notify } from "../Utils/Notify";
import { storageService } from "../Services/StorageService";

export interface CartProps {
  products: Record<string, { product: ProductModel; amount: number }>;
}

const existingCartData: CartProps =
  storageService.getCartDataFromLocalService();

const initialState: CartProps = {
  products: existingCartData ? existingCartData.products : {},
};

const generateCartItemKey = (productId: string, stockId: string) =>
  `${productId}_${stockId}`;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<{ product: ProductModel; stockId: string }>
    ) {
      const { product, stockId } = action.payload;
      const cartItemKey = generateCartItemKey(product._id, stockId);
      const cartProduct = state.products[cartItemKey];
      if (cartProduct) {
        cartProduct.product.stock[0].quantity > cartProduct.amount
          ? (state.products[cartItemKey].amount += 1)
          : notify.error(
              `The maximum you can order from ${cartProduct.product.name}
           is ${cartProduct.product.stock[0].quantity}`
            );
      } else {
        state.products[cartItemKey] = { product, amount: 1 };
      }
      storageService.saveCartToLocalStorage(state);
    },
    removeFromCart(
      state,
      action: PayloadAction<{ productId: string; stockId: string }>
    ) {
      const { productId, stockId } = action.payload;
      const cartItemKey = generateCartItemKey(productId, stockId);
      const cartItem = state.products[cartItemKey];
      if (cartItem) {
        if (cartItem.amount > 1) {
          cartItem.amount -= 1;
        } else {
          delete state.products[cartItemKey];
        }
        storageService.saveCartToLocalStorage(state);
      }
    },
    resetCart(state, action: PayloadAction<null>) {
      state.products = {};
      storageService.clearCartDataFromLocalStorage();
    },
  },
});

export const cartActions = cartSlice.actions;
export const cartReducers = cartSlice.reducer;
