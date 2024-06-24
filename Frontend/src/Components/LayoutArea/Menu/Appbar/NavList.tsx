import { List } from "@material-tailwind/react";
import { Props } from "./AppBar";
import NavListMenu from "./NavListMenu";

export default function NavList({ setOpenMobileMenu }: Props) {
  return (
    <div className="flex justify-center">
      <List
        className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1 justify-center items-center"
        placeholder={""}
      >
        <NavListMenu setOpenMobileMenu={setOpenMobileMenu} />
      </List>
    </div>
  );
}
