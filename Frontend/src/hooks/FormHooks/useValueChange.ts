import { useState } from "react";

export function useValueChange<T>(initialValue?: string) {
  const [value, setValue] = useState<T | null>(() => {
    if (initialValue) {
      return { _id: initialValue } as T;
    } else {
      return null;
    }
  });
  const handleValueChange = async (value: T) => {
    console.log(value);
    setValue(value);
  };
  return { value, handleValueChange, setValue };
}
