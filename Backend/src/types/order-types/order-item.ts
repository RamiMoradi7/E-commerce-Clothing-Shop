import { StockOption } from "./stock-option";

export type OrderItem = {
  productId: string;
  imageUrls: string[];
  name: string;
  stock: StockOption[];
  quantity: number;
  productType: string;
  price: number;
};
