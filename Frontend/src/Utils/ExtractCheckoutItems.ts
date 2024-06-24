import { ProductModel } from "../Models/ProductModel";
import { OrderItem } from "../types/OrderItems";

export const extractCheckoutItems = (
  cartItems: {
    product: ProductModel;
    amount: number;
  }[]
): OrderItem[] => {
  const items: OrderItem[] = Object.values(cartItems).reduce(
    (accumulator: OrderItem[], currentItem) => {
      const { _id, name, __t, price, stock, imageUrls } = currentItem.product;
      const { amount: quantity } = currentItem;
      const existingItemIndex = accumulator.findIndex(
        (item) => item.productId === _id
      );

      if (existingItemIndex !== -1) {
        accumulator[existingItemIndex].stock.push({
          stockId: stock[0]._id,
          quantity: quantity,
          size: stock[0].size.name,
          color: stock[0].color.name,
        });
      } else {
        accumulator.push({
          productId: _id,
          name: name,
          productType: __t,
          price: price,
          imageUrls,
          stock: [
            {
              stockId: stock[0]._id,
              quantity: quantity,
              size: stock[0].size.name,
              color: stock[0].color.name,
            },
          ],
        });
      }
      return accumulator;
    },
    []
  );
  return items;
};
