import { Typography } from "@material-tailwind/react";
import { LogoutRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import { authService } from "../../../Services/AuthService";
import { useCurrentUser } from "../../../Utils/CurrentUser";
import { notify } from "../../../Utils/Notify";
import "./AuthMenu.css";

function AuthMenu() {
  const { user } = useCurrentUser();
  function logOut(): void {
    notify.success(`Hope to see you back ${user.firstName}`);
    authService.logOut();
  }

  return (
    <div className="AuthMenu">
      {user ? (
        <div className="user-info">
          <Typography
            variant="paragraph"
            className="mr-4 cursor-pointer py-1.5 lg:ml-2 text-white text-xs"
            placeholder={""}
          >
            Hello, {user.firstName} {user.lastName}
          </Typography>
          <IconButton
            className="menu-icon"
            size="small"
            aria-label="logout-menu"
            onClick={logOut}
          >
            <LogoutRounded sx={{ color: "white" }} />
          </IconButton>
        </div>
      ) : (
        <div className="guest-info text-xs">
          <NavLink className="NavLink " to="/login">
            Login
          </NavLink>
          <span className="mx-2 text-white ">|</span>
          <NavLink className="NavLink " to="/register">
            Join Us
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default AuthMenu;
