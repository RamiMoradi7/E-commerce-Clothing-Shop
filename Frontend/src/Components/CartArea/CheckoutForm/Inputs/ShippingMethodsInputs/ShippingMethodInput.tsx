import { ChangeEvent } from "react";

interface ShippingMethodInputProps {
  selectedShippingMethod: string;
  handleShippingMethodChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  id: string;
  deliveryDays: string;
}

export default function ShippingMethodInput({
  selectedShippingMethod,
  handleShippingMethodChange,
  id,
  value,
  deliveryDays,
}: ShippingMethodInputProps): JSX.Element {
  return (
    <div className="relative">
      <input
        id={`radio_${id}`}
        type="radio"
        value={value}
        name="radio"
        onChange={handleShippingMethodChange}
        checked={selectedShippingMethod === value}
        className="hidden"
        required
      />
      <div className="relative flex items-center justify-center">
        <span
          className={`peer-checked absolute ml-5 transform -translate-y-full box-content block h-3 w-3 rounded-full border-8 border-gray-300 bg-white ${
            selectedShippingMethod === value ? "border-gray-700" : ""
          }`}
        ></span>
      </div>
      <label htmlFor={`radio_${id}`}>
        <img
          className="w-14 object-contain"
          src="/images/naorrAeygcJzX0SyNI4Y0.png"
          alt=""
        />
        <div className="ml-5">
          <span className="mt-2 font-semibold">{value}</span>
          <p className="text-slate-500 text-sm leading-6">{deliveryDays}</p>
        </div>
      </label>
    </div>
  );
}
