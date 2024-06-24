import { FormLabel, TextField } from "@mui/material";
import { Path, useForm } from "react-hook-form";

interface StringInputProps<T> {
  register: ReturnType<typeof useForm<T>>["register"];
  registerValue?: keyof T | string;
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
  defaultValue?: string;
  large?: boolean;
  disabled?: boolean;
}

function StringInput<T>({
  register,
  registerValue,
  label,
  onChange,
  value,
  name,
  defaultValue,
  large,
  disabled,
}: StringInputProps<T>): JSX.Element {
  return (
    <>
      {label ? <FormLabel>{label}</FormLabel> : <p>{name}</p>}
      <TextField
        margin="normal"
        required
        fullWidth
        label={label}
        name={label ?? name ?? ""}
        value={value ? value : defaultValue}
        autoComplete={label}
        autoFocus
        onChange={onChange}
        {...(registerValue ? register(registerValue as Path<T>) : {})}
        InputProps={{
          className: `bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500
          `,
          style: {
            minHeight: large ? "125px" : "",
            maxHeight: "200px",
            overflowY: "auto",
          },
        }}
        multiline={large}
        disabled={disabled}
      />
    </>
  );
}

export default StringInput;
