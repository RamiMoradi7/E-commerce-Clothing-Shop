import { useFormContext } from "react-hook-form";
import { Country } from "../../../../../types/Country";
import { OrderModel } from "../../../../../Models/OrderModel";
import { ChangeEvent } from "react";

interface PhoneInputProps {
  selectedCountry: Country;
}

export default function PhoneInput({
  selectedCountry,
}: PhoneInputProps): JSX.Element {
  const { setValue } = useFormContext<OrderModel>();

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: phoneNumber } = event.target;
    setValue(
      "customer.phone",
      `+${selectedCountry?.country_phone_code}-${phoneNumber}`
    );
  };
  return (
    <>
      <div className="mt-4 mb-2 block text-sm font-medium">Phone number</div>
      <div className="relative flex items-center">
        {selectedCountry && (
          <div
            className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600 dark:text-gray-400"
            aria-hidden="true"
          >
            +{selectedCountry?.country_phone_code}
          </div>
        )}
        <input
          required
          type="text"
          name="phone"
          className="block w-full p-2.5  pl-14 text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-200 shadow-sm outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          placeholder="Your phone number"
          onChange={handlePhoneChange}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
          <svg
            className="h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
