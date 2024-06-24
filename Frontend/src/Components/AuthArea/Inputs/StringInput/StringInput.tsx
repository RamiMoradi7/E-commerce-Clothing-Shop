import { Grid, TextField } from "@mui/material";
import { Path, useForm } from "react-hook-form";

interface StringInputProps<T> {
  register: ReturnType<typeof useForm<T>>["register"];
  registerName: string;
  label?: string;
}

function StringInput<T>({
  register,
  registerName,
  label,
}: StringInputProps<T>): JSX.Element {
  return (
    <Grid item xs={12} sm={6}>
      <TextField
        autoComplete="given-name"
        name="firstName"
        required
        fullWidth
        id="firstName"
        label={label}
        autoFocus
        {...register(registerName as unknown as Path<T>)}
        inputProps={{ minLength: 2, maxLength: 35 }}
      />
    </Grid>
  );
}

export default StringInput;
