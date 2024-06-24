import { NavLink } from "react-router-dom";
import { ProductModel } from "../../../Models/ProductModel";
import CartButtons from "../Buttons/CartButtons/CartButtons";
import ImageCarousel from "../../Common/ImageCarousels/ImageCarousel";
import "./CartItem.css";
import { appStore } from "../../../Redux/Store";

interface CartItemProps {
  product: ProductModel;
}

export default function CartItem({ product }: CartItemProps): JSX.Element {
  const productAmount =
    appStore.getState().cart?.products[`${product._id}_${product.stock[0]._id}`]
      ?.amount;

  return (
    <>
      {product && (
        <>
          <div className="flex flex-col sm:flex-row py-6 items-center sm:items-start">
            <div className="h-24 w-24 sm:flex-shrink-0 overflow-hidden rounded-md border border-gray-200 cart-image-carousel mb-4 sm:mb-0">
              <ImageCarousel imageUrls={product?.imageUrls} />
            </div>

            <div className="ml-0 sm:ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base text-center font-medium text-gray-900">
                  <h3 className="flex items-center">
                    <img
                      width={35}
                      src={product.brand.imageUrl}
                      alt={product.brand.name}
                      className="mr-2"
                    />
                    <NavLink to={`/products/details/${product._id}`}>
                      <p>{product.name}</p>
                    </NavLink>
                  </h3>
                  <p className="ml-4">{product.price}₪</p>
                </div>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <p className="text-gray-500">
                  {product.stock.reduce(
                    (total, s) => (total += s.quantity),
                    0
                  ) - productAmount}{" "}
                  left.
                </p>
                <p className="text-gray-500 text-xs">
                  {product.stock[0].color.name}, Size{" "}
                  {product.stock[0].size.name.toUpperCase()}
                </p>
              </div>
              <div className="flex">
                <CartButtons product={product} stockId={product.stock[0]._id} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
