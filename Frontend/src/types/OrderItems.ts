export type OrderItem = {
  productId: string;
  name: string;
  stock: { stockId: string; quantity: number; size: string; color: string }[];
  imageUrls: string[];
  productType: string;
  price: number;
};
