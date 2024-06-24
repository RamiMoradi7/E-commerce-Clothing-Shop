import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  Collapse,
  IconButton,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import TrendyThreadsLogo from "../../../Assets/Images/TrendyThreadsLogo.png";
import MenuSearch from "../../../ProductsArea/SidebarFilter/SearchBar/MenuSearch";
import { useCurrentUser } from "../../../../Utils/CurrentUser";
import AuthMenu from "../../../AuthArea/AuthMenu/AuthMenu";
import CartButton from "../../../CartArea/Buttons/CartButton/CartButton";
import NavList from "./NavList";
import Header from "../Header/Header";

export interface Props {
  setOpenMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AppBarMenu() {
  const { isAdmin } = useCurrentUser();
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <>
      <Header />
      <div className="flex justify-end items-center h-6 px-4 mb-2 mt-2">
        <div className="mr-auto"></div>
        <div className="">
          {isAdmin ? (
            <div onClick={() => navigate("/admin-dashboard")}>
              <svg
                className="h-6 w-6 text-neutral-900"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <circle cx="12" cy="12" r="3" />{" "}
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </div>
          ) : (
            <CartButton />
          )}
        </div>
        <MenuSearch />
        <Typography
          placeholder={""}
          as="div"
          variant="small"
          className="px-4 rounded-full cursor-pointer"
        >
          <AuthMenu />
        </Typography>
      </div>

      <Navbar
        className="mx-auto max-w-screen-lg px-4 shadow-transparent"
        placeholder={""}
      >
        <div className="flex items-center lg:justify-evenly sm:justify-end text-black ">
          <NavLink to={"/"}>
            <Typography
              className="cursor-pointer lg:ml-2 text-black"
              placeholder={""}
            >
              <img width={250} src={TrendyThreadsLogo} />
            </Typography>
          </NavLink>
          <div className="hidden lg:block ">
            <NavList setOpenMobileMenu={setOpenNav} />
          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            className={`${!openNav && "justify-end"} lg:hidden`}
            onClick={() => setOpenNav(!openNav)}
            placeholder={""}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>

        <Collapse open={openNav}>
          <NavList setOpenMobileMenu={setOpenNav} />
        </Collapse>
      </Navbar>
    </>
  );
}
