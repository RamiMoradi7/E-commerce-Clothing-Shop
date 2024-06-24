import { OrderItem } from "../../../types/OrderItems";
import ImageCarousel from "../../Common/ImageCarousels/ImageCarousel";

interface CheckoutListProps {
  orderItem: OrderItem;
  orderStatus: string;
}

export default function CheckoutList({
  orderItem,
  orderStatus,
}: CheckoutListProps): JSX.Element {
  return (
    <div className="flex flex-col lg:flex-row items-center border-b border-gray-200 py-6">
      <div className="lg:w-1/3 mb-4 lg:mb-0">
        <div className="lg:max-w-xs mx-auto lg:mx-0">
          <ImageCarousel imageUrls={orderItem?.imageUrls} />
        </div>
      </div>
      <div className="lg:w-2/3 px-4 lg:px-8">
        <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-2">
          {orderItem.name}
        </h2>
        <div className="flex justify-between items-center mb-4">
          {orderItem.stock.map((s, index) => (
            <div key={index} className="border rounded-lg p-4 mb-4 shadow-md">
              <p className="text-sm text-gray-600 mb-2">
                Size: <span className="font-semibold">{s.size}</span>
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Color: <span className="font-semibold">{s.color}</span>
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Quantity: <span className="font-semibold">{s.quantity}</span>
              </p>
            </div>
          ))}
          <p className="text-lg font-semibold text-gray-800">
            {orderItem.price}₪
          </p>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Status:</p>
            <p className="text-sm font-semibold text-emerald-600 bg-emerald-50 rounded-full py-1 px-3">
              {orderStatus}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
