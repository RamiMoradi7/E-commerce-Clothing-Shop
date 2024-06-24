import { Drawer } from "@mui/material";
import React, { useState } from "react";
import FilterMenu from "../FilterMenu/FilterMenu";
import SortBy from "../SortBy/SortBy";
import "./SideBarFilter.css";

interface SidebarFilterProps {
  isFilterMenuHidden: boolean;
}

const SidebarFilter: React.FC<SidebarFilterProps> = ({
  isFilterMenuHidden,
}) => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
  };

  return (
    <>
      <ul className="sort-by">
        <li className="icon-content">
          <button data-social="sort-by" aria-label="Sort by" className="border-2">
            <div className="filled"></div>
            <p className="font-thin text-sm ">Sort by</p>
          </button>
          <div className="tooltip">
            <SortBy />
          </div>
        </li>
        <div className={`${isFilterMenuHidden ? "" : "hidden"}`}>
          <li className="icon-content">
            <button
              data-social="filter"
              aria-label="Filter"
              onClick={toggleDrawer(true)}
            >
              <div className="filled"></div>
              <svg
                className="w-5 h-5 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25"
                />
              </svg>
            </button>
            <div className="tooltip">
              <button
                className="flex items-center border-black text-black rounded-full hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                aria-label="open drawer"
              >
                <p className="font-bold text-md">Filter</p>
              </button>
            </div>
          </li>
        </div>
      </ul>
      <Drawer
        slotProps={{
          backdrop: {
            style: { backgroundColor: "rgba(0, 0, 0, 0)" },
          },
        }}
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        disableScrollLock
      >
        <div>
          <FilterMenu />
        </div>
      </Drawer>
    </>
  );
};

export default SidebarFilter;
