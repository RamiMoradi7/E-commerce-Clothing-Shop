import { ProductModel } from "../Models/ProductModel";

export function calculateCartAmount(
  cartProducts: Record<string, { product: ProductModel; amount: number }>
) {
  let amount = 0;
  Object.keys(cartProducts).forEach((key) => {
    amount += cartProducts[key].amount;
  });
  return amount;
}

export function calculateCartSubtotal(
  products: Record<string, { product: ProductModel; amount: number }>
) {
  let subTotal = 0;
  Object.keys(products).forEach((key) => {
    subTotal += products[key]?.amount * products[key]?.product.price;
  });
  return subTotal;
}
