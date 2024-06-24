import { useEffect, useState } from "react";
const calculateDeliveryInfo = (
  shippingMethod: string
): { expectedDeliveryDate: Date; shippingPrice: number } => {
  const currentDate = new Date();
  let expectedDeliveryDate = new Date(currentDate);
  let shippingPrice = 0;

  switch (shippingMethod) {
    case "Fast-Delivery":
      expectedDeliveryDate.setDate(currentDate.getDate() + 7);
      shippingPrice = 45;
      break;
    case "Slow-Delivery":
      expectedDeliveryDate.setDate(currentDate.getDate() + 14);
      shippingPrice = 30;
      break;
    default:
      expectedDeliveryDate.setDate(currentDate.getDate() + 7);
      shippingPrice = 0;
      break;
  }

  return { expectedDeliveryDate, shippingPrice };
};

export function useDeliveryInfo(shippingMethod: string) {
  const [deliveryInfo, setDeliveryInfo] = useState<{
    expectedDeliveryDate: Date;
    shippingPrice: number;
  }>({
    expectedDeliveryDate: new Date(),
    shippingPrice: 0,
  });

  useEffect(() => {
    const calculatedInfo = calculateDeliveryInfo(shippingMethod);
    setDeliveryInfo(calculatedInfo);
  }, [shippingMethod]);

  return deliveryInfo;
}
