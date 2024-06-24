import { ChangeEvent } from "react";

interface PriceRangeProps {
  priceRange: string;
  setPriceRange: React.Dispatch<React.SetStateAction<string>>;
}

export default function PriceRange({
  priceRange,
  setPriceRange,
}: PriceRangeProps): JSX.Element {
  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: selectedPrice } = event.target;
    setPriceRange(selectedPrice);
  };
  return (
    <>
      <div className="relative mb-4">
        <label htmlFor="Price range">Price range</label>
        <input
          id="Price range"
          onChange={handlePriceChange}
          value={priceRange ? priceRange : ""}
          type="range"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-2"
          min="50"
          max="200"
          step="50"
        />
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
          <span>50₪</span>
          <span>100₪</span>
          <span>200₪</span>
          <span>250₪</span>
        </div>
      </div>
    </>
  );
}
