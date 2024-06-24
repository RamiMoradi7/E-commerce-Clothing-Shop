export function calculateDiscount(price: number, discount: number) {
  if (discount > 0) {
    return price - price * (discount / 100) + " ₪";
  } else {
    return price + " ₪";
  }
}
