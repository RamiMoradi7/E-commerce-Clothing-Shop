import { useSelector } from "react-redux";
import CheckoutImage from "../Assets/Images/LandingPageShoes.jpg";
import { useTitle } from "../../hooks/useTitle";
import { AppState } from "../../Redux/AppState";
import CheckoutProgress from "../CartArea/CheckoutProgress/CheckoutProgress";
import CheckoutForm from "../CartArea/CheckoutForm/CheckoutForm";
import CartItem from "../CartArea/CartItem/CartItem";
import { calculateCartSubtotal } from "../../Utils/CalculateCart";

export default function Checkout(): JSX.Element {
  useTitle("Checkout");
  const cartItems = useSelector(
    (appState: AppState) => appState.cart?.products
  );
  return (
    <>
      <CheckoutProgress step={2} />
      <div className="relative sm:py-12 lg:col-span-6 lg:py-24 w-full bg-transparent p-4 -mt-5">
        <div className="grid min-h-screen grid-cols-10">
          <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
            <div className="mx-auto w-full max-w-lg">
              <div className="  px-6 pt-8 lg:mt-0 rounded-2xl ">
                <CheckoutForm />
              </div>
              <div className="mt-10 text-center text-sm font-semibold text-gray-500">
                By placing this order you agree to the{" "}
                <div className="whitespace-nowrap text-teal-400 underline hover:text-teal-600">
                  Terms and Conditions
                </div>
              </div>
            </div>
          </div>
          <div className="relative col-span-full flex flex-col pr-8 pl-8 mr-8 sm:py-12 lg:col-span-4 lg:py-24">
            <h2 className="sr-only">Order summary</h2>
            <div className="">
              <img
                src={CheckoutImage}
                alt="checkout"
                className=" absolute inset-0 h-full w-full opacity-35 object-cover  rounded-3xl"
              />
            </div>
            <div className="w-full rounded-3xl relative bg-gray-50 bg-opacity-90 p-10">
              <div className="flow-root ">
                {Object.keys(cartItems).length > 0 && (
                  <>
                    <p>Order Summary</p>
                    <p className="text-sm">
                      Check your items. And select a suitable shipping method.
                    </p>
                  </>
                )}
                <div className="-my-6 divide-y divide-white list-none mt-4 min-w-96">
                  {Object.keys(cartItems).length > 0 ? (
                    Object.keys(cartItems).map((key) => (
                      <li key={key}>
                        <CartItem product={cartItems[key].product} />
                      </li>
                    ))
                  ) : (
                    <div className="text-2xl font-thin mt-8">
                      Your cart is empty.
                    </div>
                  )}
                </div>
              </div>
              <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
              <div className="space-y-2">
                <p className="flex justify-between text-lg font-thin text-black">
                  <span className="text-black">Total price:</span>
                  <span>{calculateCartSubtotal(cartItems)}₪</span>
                </p>
                <p className="flex justify-between text-sm text-black font-thin">
                  <span>Vat: 17%</span>
                  <span>
                    {(calculateCartSubtotal(cartItems) * 0.17).toFixed(0)}₪
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
