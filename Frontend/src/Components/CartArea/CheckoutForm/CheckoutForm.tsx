import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { OrderModel } from "../../../Models/OrderModel";
import { AppState } from "../../../Redux/AppState";
import { ordersService } from "../../../Services/OrdersService";
import { calculateCartSubtotal } from "../../../Utils/CalculateCart";
import { extractCheckoutItems } from "../../../Utils/ExtractCheckoutItems";
import { notify } from "../../../Utils/Notify";
import { useDeliveryInfo } from "../../../hooks/CheckoutHooks/useDeliveryInfo";
import { useTitle } from "../../../hooks/useTitle";
import securityIcon from "../../Assets/Images/SecurityIcon.png";
import EmailInput from "../../Common/Inputs/EmailInput/EmailInput";
import BillingAddressInput from "./Inputs/BillingAddressInput/BillingAddressInput";
import CardDetailsInput from "./Inputs/CardDetailsInput/CardDetailsInput";
import CardHolderInput from "./Inputs/CardHolderInput/CardHolderInput";
import ShippingMethodsInputs from "./Inputs/ShippingMethodsInputs/ShippingMethodsInputs";

export default function CheckoutForm(): JSX.Element {
  useTitle("Checkout");
  const methods = useForm<OrderModel>();
  const { handleSubmit, register, setValue } = methods;
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [shippingMethod, setShippingMethod] = useState("Fast-Delivery");
  const { expectedDeliveryDate, shippingPrice } = useDeliveryInfo(
    shippingMethod && shippingMethod
  );
  const navigate = useNavigate();
  const cartItems = useSelector(
    (appState: AppState) => appState.cart?.products
  );
  const cartTotal = () => {
    return calculateCartSubtotal(cartItems && cartItems);
  };

  async function order(order: OrderModel) {
    try {
      setIsProcessingOrder(true);
      const orderItems = extractCheckoutItems(Object.values(cartItems));
      order.items = orderItems;
      order.subtotal = cartTotal();
      order.total = calculateCartSubtotal(cartItems) + shippingPrice;
      order.expectedDeliveryDate = expectedDeliveryDate;
      order.shipping = shippingPrice;
      order.customer.paymentDetails.type = "credit-card";
      console.log(order);
      const addedOrder = await ordersService.addOrder(order);
      setTimeout(async () => {
        setIsProcessingOrder(false);
        notify.success(
          `Your order has been successfully placed. Thank you for shopping with us ${order.customer.name}`
        );
        navigate(`/payment-success/${addedOrder._id}`);
      }, 3000);
      console.log(order);
    } catch (err: any) {
      setIsProcessingOrder(false);
      notify.error(err);
    }
  }
  return (
    <div className="p-6 border shadow-md">
      <div className="flex flex-col items-center">
        <h1 className="relative ml-16 text-3xl mb-4 font-medium text-gray-700 sm:text-3xl flex items-center justify-center">
          Secure Checkout
          <span className="mt-2 ml-2 block h-1 w-10 bg-teal-600 sm:w-20">
            <img
              src={securityIcon}
              alt="security-icon"
              width={35}
              className="mb-3"
            />
          </span>
        </h1>
      </div>
      <p className="text-xl font-medium">Payment Details</p>
      <p className="text-gray-400">
        Complete your order by providing your payment details.
      </p>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(order)}>
          <EmailInput
            register={register}
            registerValue="customer.email"
            required
          />
          <CardHolderInput<OrderModel>
            register={register}
            registerName="customer.name"
            label="Card Holder"
            placeholder="Your full name here"
          />
          <CardDetailsInput<OrderModel>
            register={register}
            cardRegisterValue="customer.paymentDetails.cardNumber"
            expirationDateRegisterValue="customer.paymentDetails.expirationDate"
            cvvRegisterValue="customer.paymentDetails.cvv"
          />
          <BillingAddressInput />
          <ShippingMethodsInputs
            setValue={setValue}
            total={calculateCartSubtotal(cartItems)}
            setShippingMethod={setShippingMethod}
          />
          <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Subtotal</p>
              <p className="font-semibold text-gray-900">
                {cartTotal().toFixed(2)}₪
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Shipping</p>
              <p className="font-semibold text-gray-900">
                {cartTotal() >= 400 ? "Free" : shippingPrice + "₪"}
              </p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Total</p>
            <p className="text-2xl font-semibold text-gray-900">
              {cartTotal() >= 400
                ? cartTotal().toFixed(2)
                : (cartTotal() + shippingPrice).toFixed(2)}
              ₪
            </p>
          </div>
          <button
            className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white relative"
            disabled={isProcessingOrder}
          >
            {isProcessingOrder ? (
              <span className="absolute inset-0 flex items-center justify-center">
                Checking payment requirement...
              </span>
            ) : (
              "Place Order"
            )}
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
