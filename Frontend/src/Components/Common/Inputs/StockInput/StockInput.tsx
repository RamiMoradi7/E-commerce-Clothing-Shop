import { useEffect, useState } from "react";
import { ColorModel } from "../../../../Models/ColorModel";
import { SizeModel } from "../../../../Models/SizeModel";
import { colorsService } from "../../../../Services/ColorsService";
import { Stock } from "../../../../types/Stock";

interface StockInputProps {
  sizesByCategory: SizeModel[];
  onChange?: (values: Stock) => void;
  disabled?: boolean;
  defaultValue?: Stock;
}

export default function StockInput({
  sizesByCategory,
  onChange,
  disabled,
  defaultValue,
}: StockInputProps): JSX.Element {
  const [colors, setColors] = useState<ColorModel[]>([]);
  const [stockOption, setStockOption] = useState<Partial<Stock>>(
    () => defaultValue || {}
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedColors = await colorsService.getColors();
        setColors(fetchedColors);
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (
      onChange &&
      stockOption.color &&
      stockOption.size &&
      stockOption.quantity !== undefined
    ) {
      onChange(stockOption as Stock);
    }
  }, [stockOption, onChange]);

  return (
    <div className="max-w-sm mx-auto">
      <div className="flex space-x-2">
        <select
          value={stockOption.color?._id || ""}
          onChange={(e) => {
            const colorId = e.target.value;
            const color = colors.find((c) => c._id === colorId) || null;
            setStockOption((prevStockOption) => ({
              ...prevStockOption,
              color: color,
            }));
          }}
          required
          className="form-select w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
          disabled={disabled}
        >
          <option disabled value="">
            Select Color
          </option>
          {colors.map((color) => (
            <option key={color._id} value={color._id}>
              {color.name}
            </option>
          ))}
        </select>
        <select
          value={stockOption.size?._id || ""}
          onChange={(e) => {
            const sizeId = e.target.value;
            const size = sizesByCategory.find((s) => s._id === sizeId) || null;
            setStockOption((prevStockOption) => ({
              ...prevStockOption,
              size: size,
            }));
          }}
          required
          disabled={disabled || !stockOption.color}
          className="form-select w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option disabled value="">
            Select Size
          </option>
          {sizesByCategory.map((size) => (
            <option key={size._id} value={size._id}>
              {size.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={stockOption.quantity ?? ""}
          onChange={(e) =>
            setStockOption((prevStockOption) => ({
              ...prevStockOption,
              quantity: parseInt(e.target.value),
            }))
          }
          placeholder="Quantity"
          required
          disabled={disabled || !stockOption.color || !stockOption.size}
          className="form-input w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
}
