import { SearchSharp } from "@mui/icons-material";
import React, { ChangeEvent } from "react";
import { useSearchNavigate } from "../../../../hooks/useSearchNavigate";
import _ from "lodash";
import { InputAdornment, TextField } from "@mui/material";
const SearchBar: React.FC = () => {
  const { setSearchParam } = useSearchNavigate();
  const handleSearchChange = _.debounce((e: ChangeEvent<HTMLInputElement>) => {
    const { value: searchValue } = e.target;
    setSearchParam("name", searchValue,"products");
  }, 600);

  return (
    <div className="relative mb-4 w-full">
      <div className="relative w-full">
        <TextField
          fullWidth
          onChange={handleSearchChange}
          variant="standard"
          placeholder="Search Products..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchSharp />
              </InputAdornment>
            ),
            classes: {
              root: "bg-white rounded-full",
              input: "py-2 px-4 focus:outline-none",
            },
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
