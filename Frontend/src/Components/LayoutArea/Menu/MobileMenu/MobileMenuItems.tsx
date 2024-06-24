import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Collapse, MenuItem, Typography } from "@material-tailwind/react";
import ListItem from "@material-tailwind/react/components/List/ListItem";
import Menu, { MenuHandler } from "@material-tailwind/react/components/Menu";
import React from "react";
import { AudienceModel } from "../../../../Models/AudienceModel";
import { CategoryModel } from "../../../../Models/CategoryModel";

interface MobileMenuProps {
  toggleMenu: () => void;
  audiences: AudienceModel[];
  categories: CategoryModel[];
  activeAudience: string;
  setActiveAudience: React.Dispatch<React.SetStateAction<string>>;
  handleSelectChange: (categoryId: string, subCategoryId?: string) => void;
}

export default function MenuItems({
  toggleMenu,
  audiences,
  categories,
  activeAudience,
  setActiveAudience,
  handleSelectChange,
}: MobileMenuProps): JSX.Element {
  const renderItems = categories?.map((category) => (
    <li key={category._id} className="list-none">
      <MenuItem
        placeholder={""}
        className="flex items-center m-6 gap-4 rounded-lg"
      >
        <div className="flex items-center justify-center">
          <img src={category?.imageUrl} width={35} alt={category._id} />
        </div>
        <div>
          <Typography
            placeholder={""}
            variant="h6"
            color="black"
            className="flex items-center text-sm font-bold"
            onClick={() => {
              handleSelectChange(category._id, null);
              toggleMenu();
            }}
          >
            {category.name}
          </Typography>

          <Typography
            placeholder={""}
            variant="h5"
            className="text-xs !font-medium text-black"
          >
            {category.subCategories?.map((subCategory) => (
              <div
                key={subCategory._id}
                onClick={() => {
                  handleSelectChange(category._id, subCategory._id);
                  toggleMenu();
                }}
                className="text-xs !font-medium text-black"
              >
                {subCategory.name}
              </div>
            ))}
          </Typography>
        </div>
      </MenuItem>
    </li>
  ));

  return (
    <>
      {audiences?.map((audience) => (
        <React.Fragment key={audience._id}>
          <div>
            <Menu>
              <MenuHandler>
                <Typography
                  placeholder={""}
                  as="div"
                  variant="small"
                  className="font-medium"
                >
                  <ListItem
                    placeholder={""}
                    className="flex w-full items-center gap-2 py-2 pr-4 font-medium text-gray-900"
                    selected={activeAudience === audience._id}
                    onClick={() => {
                      activeAudience === audience._id
                        ? setActiveAudience("")
                        : setActiveAudience(audience._id);
                    }}
                  >
                    {audience.name}
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`hidden h-3 w-3 transition-transform lg:block ${
                        activeAudience === audience._id ? "rotate-180" : ""
                      }`}
                    />
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`block h-3 w-3 transition-transform lg:hidden ${
                        activeAudience === audience?._id ? "rotate-180" : ""
                      }`}
                    />
                  </ListItem>
                </Typography>
              </MenuHandler>
            </Menu>
          </div>
          <div
            className=" lg:hidden grid grid-cols-1 gap-y-2 outline-none outline-0"
            style={{ justifyContent: "flex-start" }}
          >
            {renderItems && (
              <Collapse open={activeAudience === audience._id}>
                {renderItems}
              </Collapse>
            )}
          </div>
        </React.Fragment>
      ))}
    </>
  );
}
