import { ColorModel } from "../../../../Models/ColorModel";
import { ProductModel } from "../../../../Models/ProductModel";
import { SizeModel } from "../../../../Models/SizeModel";
import { Stock } from "../../../../types/Stock";


interface SizeSelectorProps {
  selectedColor: ColorModel;
  stock: Stock[];
  handleInputChange: (
    stock: Stock,
    type: string,
    product: ProductModel
  ) => void;
  product: ProductModel;
  selectedSize: SizeModel;
}

export default function SizeSelector({
  selectedColor,
  handleInputChange,
  stock,
  product,
  selectedSize,
}: SizeSelectorProps): JSX.Element {
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Sizes</h3>
        Size guide
      </div>

      <fieldset aria-label="Choose a size" className="mt-4">
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
          {selectedColor &&
            stock
              .filter((item) => item.color._id === selectedColor._id)
              .map((stockItem) => {
                const { size } = stockItem;
                const isSizeAvailable = stockItem.quantity > 0;

                return (
                  <div key={`${stockItem._id}`}>
                    <label
                      className={`group relative flex h-13 w-22 flex-col items-center justify-center border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm ${
                        selectedSize && selectedSize._id === size._id
                          ? "border"
                          : "border-2"
                      }`}
                    >
                      <input
                        type="radio"
                        name="size-choice"
                        value={size.name}
                        onClick={() => {
                          handleInputChange(stockItem, "size", product);
                        }}
                        className="sr-only"
                        disabled={!isSizeAvailable}
                      />
                      <span className="relative">{size.name}</span>
                      {!isSizeAvailable && (
                        <span className="text-red-400 opacity-70 absolute transform rotate-80 translate-y-0  right-2 -top-6 font-thin text-8xl">
                          \
                        </span>
                      )}
                      <span
                        className={`pointer-events-none absolute -inset-px rounded-md ${
                          selectedSize?._id === size._id
                            ? "border-2 border-blue-700"
                            : "bg-transparent"
                        }`}
                        aria-hidden="true"
                      ></span>
                    </label>
                    {!isSizeAvailable && (
                      <div className=" font-thin text-red-400 text-sm">
                        Out of stock
                      </div>
                    )}
                  </div>
                );
              })}
        </div>
      </fieldset>
    </>
  );
}
