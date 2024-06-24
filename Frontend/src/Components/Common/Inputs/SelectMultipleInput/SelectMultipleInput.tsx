import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import { useState } from "react";
import { ColorModel } from "../../../../Models/ColorModel";
import { SizeModel } from "../../../../Models/SizeModel";
import { useFetch } from "../../../../hooks/useFetch";

interface SelectMultipleInputProps<T extends SizeModel | ColorModel> {
  label: string;
  fnQuery?: (_id?: string) => Promise<T[]>;
  disabled?: boolean;
  setSearchParam: (key: string, value: string[]) => void;
  searchKey: string;
}

export default function SelectMultipleInput<T extends ColorModel | SizeModel>({
  label,
  fnQuery,
  disabled,
  setSearchParam,
  searchKey,
}: SelectMultipleInputProps<T>) {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const { result: data, isLoading } = useFetch(fnQuery);
  const [selected, setSelected] = useState<T[]>([]);
  const handleValueChange = (event: React.ChangeEvent<{}>, values: T[]) => {
    setSelected(values);
    setSearchParam(
      searchKey,
      values.map((c) => c._id)
    );
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <Autocomplete
      fullWidth
      multiple
      disableCloseOnSelect
      options={data || []}
      value={selected}
      onChange={handleValueChange}
      getOptionLabel={(option) => option?.name || ""}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="filled"
          label={label}
          InputProps={{
            ...params.InputProps,
            disableUnderline: true,
            sx: {
              backgroundColor: "transparent",
              borderRadius: 4,
              "& .MuiFilledInput-input": {
                padding: "10px 12px",
              },
            },
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props} className="flex items-center">
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            checked={selected.some((s) => s._id === option._id)}
            sx={{
              padding: 0,
              marginRight: "8px",
            }}
          />
          <span
            className={`py-2 px-4 rounded`}
            style={{
              border: label === "Colors" ? `1px solid ${option.name}` : "none",
              borderRadius: "4px",
              backgroundColor: label === "Colors" ? "#f4f4f4" : "transparent",
            }}
          >
            {option.name}
          </span>
        </li>
      )}
    />
  );
}
