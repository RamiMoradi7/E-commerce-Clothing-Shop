import { useState } from "react";
import { Stock } from "../../types/Stock";

export function useStockChange() {
  const [stock, setStock] = useState<Stock[]>([new Stock()]);
  const handleStockChange = (stock: Stock, index: number) => {
    setStock((prevStock) => {
      const updatedStockList = [...prevStock];
      updatedStockList[index] = stock;
      return updatedStockList;
    });
  };
  const addToStock = () => {
    setStock((prevStock) => [...prevStock, new Stock()]);
  };
  const removeFromStock = (index: number) => {
    setStock((prevStock) => prevStock.filter((_, idx) => idx !== index));
  };

  return { stock, setStock, handleStockChange, addToStock, removeFromStock };
}
