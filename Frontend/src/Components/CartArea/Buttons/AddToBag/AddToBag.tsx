import { ProductModel } from "../../../../Models/ProductModel";
import { cartActions } from "../../../../Redux/CartSlice";
import { appStore } from "../../../../Redux/Store";
import "./AddToBag.css";
interface AddToBagProps {
  product: ProductModel;
}

export default function AddToBag({ product }: AddToBagProps): JSX.Element {
  return (
    <>
      <button
        className="fancy mt-5"
        disabled={!product}
        onClick={() =>
          appStore.dispatch(
            cartActions.addToCart({
              product: product,
              stockId: product.stock[0]._id,
            })
          )
        }
      >
        <span className="top-key"></span>
        <span className="text">Add To Bag</span>
        <span className="bottom-key-1"></span>
        <span className="bottom-key-2"></span>
      </button>
    </>
  );
}
