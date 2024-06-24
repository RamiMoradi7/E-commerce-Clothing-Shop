import { useSelector } from "react-redux";
import { ProductModel } from "../../../../Models/ProductModel";
import { AppState } from "../../../../Redux/AppState";
import { cartActions } from "../../../../Redux/CartSlice";
import { appStore } from "../../../../Redux/Store";

interface CartProps {
  product: ProductModel;
  stockId?: string;
}

export default function CartButtons({
  product,
  stockId,
}: CartProps): JSX.Element {
  const products = useSelector((appState: AppState) => appState.cart?.products);
  const productAmount = Object.values(products).find(
    (item) => item.product.stock[0]._id === stockId
  );
  return (
    <div className="">
      <button
        type="button"
        onClick={() =>
          appStore.dispatch(
            cartActions.removeFromCart({ productId: product._id, stockId })
          )
        }
        data-input-counter-decrement="counter-input"
        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 hover:bg-gray-400"
      >
        <svg
          className="h-2.5 w-2.5 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 2"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h16"
          />
        </svg>
      </button>
      <input
        type="text"
        data-input-counter
        className="w-10 shrink-0 border-0 bg-transparent text-center text-lg font-medium focus:outline-none focus:ring-0"
        placeholder={productAmount?.amount.toString() || "0"}
        required
      />
      <button
        type="button"
        onClick={() => {
          appStore.dispatch(cartActions.addToCart({ product, stockId }));
        }}
        data-input-counter-increment="counter-input"
        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 hover:bg-gray-400"
      >
        <svg
          className="h-2.5 w-2.5 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
      </button>
    </div>
  );
}
