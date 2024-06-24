import { FormLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { ProductModel } from "../../../../Models/ProductModel";
interface NumberInputProps {
  register: ReturnType<typeof useForm<ProductModel>>["register"];
  registerValue: "price" | "stock" | "discount";
  name: string;
  label: string;
}
function NumberInput({
  register,
  name,
  label,
  registerValue,
}: NumberInputProps): JSX.Element {
  return (
    <>
      <FormLabel>{label}</FormLabel>
      <TextField
        margin="normal"
        required
        fullWidth
        name={name}
        label={label}
        type="number"
        {...register(`${registerValue}`)}
        inputProps={{
          className:
            "bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500",
        }}
      />
    </>
  );
}

export default NumberInput;
