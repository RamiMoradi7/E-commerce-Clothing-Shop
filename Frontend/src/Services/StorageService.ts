import { CartProps } from "../Redux/CartSlice";
import { notify } from "../Utils/Notify";

class StorageService {
  public saveCartToLocalStorage = (cart: CartProps) => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (err: any) {
      notify.error(err);
    }
  };
  getCartDataFromLocalService = () => {
    try {
      const cartData = localStorage.getItem("cart");
      return cartData ? JSON.parse(cartData) : null;
    } catch (err: any) {
      notify.error(err);
      return null;
    }
  };

  clearCartDataFromLocalStorage = () => {
    localStorage.removeItem("cart");
  };
}

export const storageService = new StorageService();
