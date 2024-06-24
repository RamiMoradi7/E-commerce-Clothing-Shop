import { ChangeEvent, useState } from "react";
import { Path, UseFormRegister } from "react-hook-form";
import { AudienceModel } from "../../../../Models/AudienceModel";
import { BrandModel } from "../../../../Models/BrandModel";
import { CategoryModel } from "../../../../Models/CategoryModel";
import { ProductModel } from "../../../../Models/ProductModel";
import { SubCategoryModel } from "../../../../Models/SubCategoryModel";
import { useFetch } from "../../../../hooks/useFetch";

interface SelectInputProps<
  T extends ProductModel,
  K extends CategoryModel | BrandModel | AudienceModel | SubCategoryModel
> {
  register: UseFormRegister<T>;
  defaultValue?: string;
  registerValue: string;
  onValueChange?: (value: K) => void;
  label: string;
  name?: string;
  fnQuery: (_id?: string) => Promise<K[]>;
  disabled?: boolean;
  required?: boolean;
}

function SelectInput<
  T extends ProductModel,
  K extends CategoryModel | BrandModel | AudienceModel | SubCategoryModel
>({
  register,
  defaultValue,
  registerValue,
  onValueChange,
  label,
  name,
  fnQuery,
  disabled,
  required,
}: SelectInputProps<T, K>): JSX.Element {
  const [selectedValue, setSelectedValue] = useState<string>(
    (defaultValue as Path<T>) ?? ""
  );
  const { result: data, isLoading } = useFetch(fnQuery);

  const handleValueChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);

    if (onValueChange) {
      onValueChange(data.find((d) => d._id === selectedValue));
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mb-4">
      <div className="text-sm font-semibold text-gray-600">{label}</div>
      <br />
      <select
        {...register(registerValue as Path<T>)}
        value={selectedValue ? selectedValue : ""}
        onChange={handleValueChange}
        disabled={disabled}
        autoFocus={!selectedValue}
        required={required}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option disabled value="">
          Select {name}...
        </option>
        {data?.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}
export default SelectInput;
