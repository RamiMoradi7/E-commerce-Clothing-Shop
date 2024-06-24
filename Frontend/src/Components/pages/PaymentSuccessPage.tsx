import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { appStore } from "../../Redux/Store";
import { OrderModel } from "../../Models/OrderModel";
import { cartActions } from "../../Redux/CartSlice";
import { ordersService } from "../../Services/OrdersService";
import { notify } from "../../Utils/Notify";
import CheckoutProgress from "../CartArea/CheckoutProgress/CheckoutProgress";
import CheckoutList from "../CartArea/CheckoutList/CheckoutList";

export default function PaymentSuccessPage(): JSX.Element {
  const [order, setOrder] = useState<OrderModel>(null);

  const { _id } = useParams();
  useEffect(() => {
    appStore.dispatch(cartActions.resetCart());
    ordersService
      .getOrder(_id)
      .then((order) => {
        setOrder(order);
      })

      .catch((err: any) => notify.error(err));
  }, [_id]);

  const formatDeliveryDate = (date: Date) => {
    const deliveryDate = new Date(date);
    const formattedDeliveryDate = deliveryDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDeliveryDate;
  };
  return (
    <>
      <CheckoutProgress step={3} />
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center">
            Payment Successful
          </h2>
          <p className="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">
            Thanks {order?.customer.name} for making a purchase with us, you can
            check our order summary from below
          </p>
          <div className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
              <div className="data">
                <p className="font-semibold text-base leading-7 text-black">
                  Order Id:
                  <span className="text-indigo-600 font-medium">
                    {""} #{order?._id}
                  </span>
                </p>
                <p className="font-semibold text-base leading-7 text-black mt-4">
                  Payment Method :
                  <span className="text-gray-400 font-medium">
                    {order?.customer.paymentDetails.type}
                  </span>
                </p>
              </div>
              <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                <div className="flex gap-3 lg:block">
                  <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                    Purchased At
                  </p>
                  <p className="font-medium">
                    {formatDeliveryDate(order?.orderDate)}
                  </p>
                </div>
              </div>
              <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                <div className="flex gap-3 lg:block">
                  <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                    Expected Delivery Date
                  </p>
                  <p className="font-medium">
                    {formatDeliveryDate(order?.expectedDeliveryDate)}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full px-3 min-[400px]:px-6">
              <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                {order?.items?.map((item) => (
                  <CheckoutList
                    key={`${item.productId}-${item.price}`}
                    orderItem={item}
                    orderStatus={order?.orderStatus}
                  />
                ))}
              </div>
              <div className="flex flex-col lg:flex-row items-center py-6 gap-6 w-full">
                {"Content here"}
              </div>
            </div>
            <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
              <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
                <p className="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">
                  We'll send notifications to your email:{" "}
                  {order?.customer.email} and
                  <span className="text-gray-500">
                    {" "}
                    to your phone {order?.customer.phone}
                  </span>
                </p>
              </div>
              <p className="font-semibold text-lg text-black py-6">
                Total Price:{" "}
                <span className="text-indigo-600">{order?.total} ₪</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
