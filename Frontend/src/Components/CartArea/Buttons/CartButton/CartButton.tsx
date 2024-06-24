import { useSelector } from "react-redux";
import { calculateCartAmount } from "../../../../Utils/CalculateCart";
import { AppState } from "../../../../Redux/AppState";
import { useState } from "react";
import Cart from "../../Cart/Cart";

export default function CartButton(): JSX.Element {
  const cart = useSelector((appState: AppState) =>
    calculateCartAmount(appState?.cart.products)
  );

  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <div
        className="flex justify-center items-center cursor-pointer"
        onClick={() => setOpen((open) => !open)}
      >
        <svg
          className="h-8 w-8 text-slate-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <div className="absolute -top-1 -right-1 bg-red-500 rounded-full h-5 w-5 flex justify-center items-center text-white text-xs font-medium">
          {cart < 10 ? cart : "9+"}
        </div>
      </div>

      <Cart open={open} setOpen={setOpen} />
    </div>
  );
}
