import { ChangeEvent, useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { OrderModel } from "../../../../../Models/OrderModel";
import ShippingMethodInput from "./ShippingMethodInput";

interface ShippingMethodsInputsProps {
  setValue: UseFormSetValue<OrderModel>;
  total: number;
  setShippingMethod: React.Dispatch<React.SetStateAction<string>>;
}

export default function ShippingMethodsInputs({
  setValue,
  total,
  setShippingMethod,
}: ShippingMethodsInputsProps): JSX.Element {
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState("Fast-Delivery");

  useEffect(() => {
    if (total >= 400) {
      setValue("shippingMethod", "Free-Above-400");
      setShippingMethod("Free-Above-400");
    }
  }, [total, setValue,setShippingMethod]);

  const handleShippingMethodChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: ShippingMethod } = event.target;
    setSelectedShippingMethod(ShippingMethod);
    setValue("shippingMethod", ShippingMethod);
    setShippingMethod(ShippingMethod);
  };

  return (
    <>
      {total >= 400 ? (
        <div className="text-green-600 font-semibold mt-8">
          🎉 Congratulations! You qualify for FREE shipping on orders above
          400₪! 🚚🌟
        </div>
      ) : (
        <>
          <p className="mt-8 text-lg font-medium">Shipping Methods</p>
          <div className="mt-5">
            <div className="relative  gap-8 flex items-center justify-center">
              <ShippingMethodInput
                id="1"
                value="Fast-Delivery"
                selectedShippingMethod={selectedShippingMethod}
                handleShippingMethodChange={handleShippingMethodChange}
                deliveryDays="2-4 days."
              />
              <ShippingMethodInput
                id="2"
                value="Slow-Delivery"
                selectedShippingMethod={selectedShippingMethod}
                handleShippingMethodChange={handleShippingMethodChange}
                deliveryDays="7-12 days."
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
