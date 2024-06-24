import { Autocomplete, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { OrderModel } from "../../../../../Models/OrderModel";
import { mapToOptions } from "../../../../../Utils/MapToOptions";

interface AddressSelectProps<T> {
  label: string;
  values: T[];
  fieldName: keyof T;
  onChange: (value: T) => void;
  defaultValue?: T;
  msg?: string;
  name: string;
}

export default function AddressSelect<T>({
  label,
  values,
  fieldName,
  onChange,
  defaultValue,
  msg,
  name,
}: AddressSelectProps<T>): JSX.Element {
  const { setValue } = useFormContext();
  const mappedOptions = mapToOptions(values, fieldName);
  const handleValueChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: T | null
  ) => {
    if (value && onChange) {
      setValue(name, value[fieldName]);
      onChange(value);
    }
  };
  return (
    <div className="relative flex-shrink-0">
      <div className="mt-1.5">
        <Autocomplete
          id={fieldName as string}
          options={mappedOptions?.sort(
            (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
          )}
          aria-required
          groupBy={(option) => option?.firstLetter}
          getOptionLabel={(option) => String(option[fieldName])}
          isOptionEqualToValue={(option, value) =>
            option[fieldName] === value[fieldName]
          }
          value={defaultValue ? { ...defaultValue, firstLetter: "" } : null}
          sx={{
            width: "100%",
            borderRadius: 30,
            background: "white",
            border: "black",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: 30,
                fontSize: 12,
              },
            },
          }}
          renderInput={(params) => <TextField {...params} label={label} />}
          onChange={handleValueChange}
          noOptionsText={values.length > 0 ? "No options available." : msg}
        />
      </div>
    </div>
  );
}
