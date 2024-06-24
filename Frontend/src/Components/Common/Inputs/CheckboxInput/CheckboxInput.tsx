import React, { useState } from "react";
import { Stock } from "../../../../types/Stock";

interface CheckboxInputProps<T extends Stock> {
  value: T;
  name?: string;
  required: boolean;
}

export default function CheckboxInput<T extends Stock>({
  value,
  name,
  required,
}: CheckboxInputProps<T>): JSX.Element {
  return (
    <div className="w-full gap-4">
      <input
        type="checkbox"
        id={`${name}-${value._id}`}
        value={value._id}
        className="hidden"
      />
      <label
        htmlFor={`${name}-${value._id}`}
        style={{ backgroundColor: `${value?.color.hex}80` }}
        className="flex items-center justify-between m-1 p-2 bg-gray-200 border border-gray-300 rounded-lg cursor-pointer transition-all duration-300 hover:border-blue-500 hover:shadow-md dark:bg-gray-800 dark:border-gray-600"
      >
        <div className="">
          <span className="text-xs font-medium">
            {value.color.name} Size {value.size.name.toUpperCase()}
          </span>
        </div>
      </label>
    </div>
  );
}
