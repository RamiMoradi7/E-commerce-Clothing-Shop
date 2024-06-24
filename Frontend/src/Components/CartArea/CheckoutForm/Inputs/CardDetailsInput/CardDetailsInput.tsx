import { Path, useForm } from "react-hook-form";

interface CardDetailsInputProps<T> {
  register: ReturnType<typeof useForm<T>>["register"];
  cardRegisterValue: string;
  expirationDateRegisterValue: string;
  cvvRegisterValue: string;
}

export default function CardDetailsInput<T>({
  register,
  cardRegisterValue,
  expirationDateRegisterValue,
  cvvRegisterValue,
}: CardDetailsInputProps<T>): JSX.Element {
  return (
    <>
      <label htmlFor="card-no" className="mt-4 mb-2 block text-sm font-medium">
        Card Details
      </label>
      <div className="flex">
        <div className="relative w-7/12 flex-shrink-0">
          <input
            type="text"
            id="card-no"
            name="card-no"
            className="w-full rounded-md border text-center border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="4580-3900-xxxx-xxxx"
            {...register(cardRegisterValue as unknown as Path<T>)}
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <svg
              className="h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
              <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
            </svg>
          </div>
        </div>
        <input
          type="text"
          name="credit-expiry"
          className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
          placeholder="MM/YY"
          pattern="(0[1-9]|1[0-2])\/\d{2}"
          {...register(expirationDateRegisterValue as unknown as Path<T>)}
        />
        <input
          type="text"
          name="credit-cvc"
          className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
          placeholder="CVV"
          maxLength={3}
          {...register(cvvRegisterValue as unknown as Path<T>)}
        />
      </div>
    </>
  );
}
