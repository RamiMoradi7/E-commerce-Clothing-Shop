import { Path, useForm } from "react-hook-form";

interface EmailInputProps<T> {
  register: ReturnType<typeof useForm<T>>["register"];
  registerValue?: string;
  required?: boolean;
  defaultEmail?: string;
}

function EmailInput<T>({
  register,
  registerValue,
  required,
}: EmailInputProps<T>): JSX.Element {
  return (
    <div className="w-full">
      <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">
        Email
      </label>
      <div className="relative w-full">
        <input
          type="text"
          id="email"
          name="email"
          required={required}
          className="w-full text-center text-black rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
          placeholder="your.email@gmail.com"
          {...register(
            registerValue
              ? (registerValue as unknown as Path<T>)
              : ("email" as unknown as Path<T>)
          )}
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default EmailInput;
