import { calculateDiscount } from "../../../../Utils/ProductDetailsUtils";
import ProductReviews from "../ProductReviews/ProductReviews";

interface ProductInfoSectionProps {
  name: string;
  price: number;
  discount: number;
}

export default function ProductInfoSection({
  name,
  price,
  discount,
}: ProductInfoSectionProps): JSX.Element {
  return (
    <>
      <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
        <h1 className="text-2xl font-thin  tracking-tight text-gray-900 sm:text-3xl">
          {name}
        </h1>
      </div>
      <div className="mt-4 lg:row-span-3 lg:mt-0">
        <h2 className="sr-only">Product information</h2>
        <div className="flex items-center">
          <p className="text-3xl tracking-tight text-gray-900">
            {calculateDiscount(price, discount)}
          </p>
          {discount > 0 && (
            <div className="ml-2 flex items-center">
              <p className="text-lg text-gray-500 line-through">{price}₪</p>
              <div className="relative ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M13.293 3.293a1 1 0 0 1 1.414 1.414L9 11.414l-3.707-3.707a1 1 0 1 1 1.414-1.414L9 8.586l3.293-3.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-full bg-green-400 text-white text-xs font-bold p-1 rounded-full">
                  {discount}% OFF
                </p>
              </div>
            </div>
          )}
        </div>

        <ProductReviews />
      </div>
    </>
  );
}
