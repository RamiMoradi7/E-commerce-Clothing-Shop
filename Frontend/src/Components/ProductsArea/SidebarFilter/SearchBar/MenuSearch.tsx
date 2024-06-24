import { Drawer, IconButton, Toolbar } from "@mui/material";
import React, { useState } from "react";
import SearchBar from "./SearchBar";

const MenuSearch: React.FC = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
  };

  return (
    <>
      <Toolbar>
        <IconButton onClick={toggleDrawer(true)} aria-label="open drawer">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </IconButton>
      </Toolbar>
      <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
        <div className="p-4 bg-gray-100 rounded-t-lg">
          <SearchBar />
        </div>
      </Drawer>
    </>
  );
};

export default MenuSearch;
