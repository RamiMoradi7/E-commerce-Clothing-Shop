import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Path, useForm } from "react-hook-form";

interface PasswordInputProps<T> {
  register: ReturnType<typeof useForm<T>>["register"];
}

function PasswordInput<T>({ register }: PasswordInputProps<T>): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <>
      <label className="mt-4 mb-2 block text-sm font-medium">Password</label>
      <TextField
        className="w-full text-center bg-white  rounded-md border border-gray-200  pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
        margin="normal"
        required
        fullWidth
        name="password"
        type={showPassword ? "text" : "password"}
        id="password"
        {...register("password" as unknown as Path<T>)}
        inputProps={{ min: 4, max: 256 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={togglePasswordVisibility} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
}

export default PasswordInput;
