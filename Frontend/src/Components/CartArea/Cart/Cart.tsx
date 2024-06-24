import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AppState } from "../../../Redux/AppState";
import { CartProps } from "../../../Redux/CartSlice";
import { calculateCartSubtotal } from "../../../Utils/CalculateCart";
import CheckoutButton from "../Buttons/CheckoutButton/CheckoutButton";
import CartItem from "../CartItem/CartItem";

interface ICart {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Cart({ open, setOpen }: ICart): JSX.Element {
  const { products: cartItems } = useSelector<AppState, CartProps>(
    (appState) => appState.cart
  );
  const cartSubtotal = calculateCartSubtotal(cartItems ? cartItems : {});

  return (
    <>
      <Transition show={open}>
        <Dialog className="relative z-50" onClose={setOpen}>
          <TransitionChild
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <TransitionChild
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <DialogPanel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <DialogTitle className="text-lg font-medium text-gray-900">
                            Shopping cart
                          </DialogTitle>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen((open) => !open)}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <div
                              role="list"
                              className="-my-6 divide-y divide-gray-200 list-none"
                            >
                              {Object.keys(cartItems).length > 0 ? (
                                Object.keys(cartItems).map((key) => (
                                  <li key={key}>
                                    <CartItem
                                      product={cartItems[key].product}
                                    />
                                  </li>
                                ))
                              ) : (
                                <div>No items in cart.</div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>{cartSubtotal}₪</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div
                          className="mt-6 w-full flex justify-center"
                          onClick={() => setOpen((open) => !open)}
                        >
                          <NavLink to={"/checkout"}>
                            <CheckoutButton />
                          </NavLink>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p className="text-lg">
                            or &nbsp;
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => setOpen((open) => !open)}
                            >
                              <NavLink to={"/products?"}>
                                Continue Shopping
                              </NavLink>
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
