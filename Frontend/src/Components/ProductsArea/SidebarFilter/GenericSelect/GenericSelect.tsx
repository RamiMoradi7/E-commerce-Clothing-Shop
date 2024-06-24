import { ChangeEvent, useEffect, useState } from "react";
import { AudienceModel } from "../../../../Models/AudienceModel";
import { BrandModel } from "../../../../Models/BrandModel";
import { CategoryModel } from "../../../../Models/CategoryModel";
import { useFetch } from "../../../../hooks/useFetch";

interface GenericSelectProps<
  T extends CategoryModel | AudienceModel | BrandModel
> {
  fnQuery: () => Promise<T[]>;
  label: string;
  defaultValue?: string;
  setSearchParam: (key: string, value: string) => void;
  searchKey: string;
}

export default function GenericSelect<
  T extends CategoryModel | AudienceModel | BrandModel
>({
  fnQuery,
  label,
  defaultValue,
  setSearchParam,
  searchKey,
}: GenericSelectProps<T>): JSX.Element {
  const { result: data, isLoading } = useFetch(fnQuery);
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  function handleValueChange(event: ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    if (!value) {
      setSearchParam(searchKey, "");
      setSelectedValue("");
    } else {
      setSearchParam(searchKey, value);
      setSelectedValue(value);
    }
  }

  useEffect(() => {
    if (!defaultValue) {
      setSelectedValue("");
    } else {
      setSelectedValue(defaultValue);
    }
  }, [defaultValue]);
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <label
            htmlFor={label}
            className="block mb-2 mt-4 text-sm font-medium text-gray-600 w-full"
          >
            {label}
          </label>
          <div className="relative w-full mb-8">
            <select
              value={selectedValue ? selectedValue : ""}
              id={label}
              onChange={handleValueChange}
              className="h-12 border border-gray-300 text-gray-900 text-xs font-medium rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white"
            >
              <option value={""}>Select {label}</option>
              {data?.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name}
                </option>
              ))}
            </select>
            <svg
              className="absolute top-1/2 -translate-y-1/2 right-4 z-50"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609"
                stroke="#111827"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </>
      )}
    </>
  );
}
