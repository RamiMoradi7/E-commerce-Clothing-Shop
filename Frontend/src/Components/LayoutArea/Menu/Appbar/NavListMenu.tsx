import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  Collapse,
  ListItem,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Props } from "./AppBar";
import { AudienceModel } from "../../../../Models/AudienceModel";
import { CategoryModel } from "../../../../Models/CategoryModel";
import { SubCategoryModel } from "../../../../Models/SubCategoryModel";
import { audiencesService } from "../../../../Services/AudiencesService";
import { categoriesService } from "../../../../Services/CategoriesService";
import { constructProductUrl } from "../../../../Utils/ConstructProductUrl";
import { useFetch } from "../../../../hooks/useFetch";
export default function NavListMenu({ setOpenMobileMenu }: Props) {
  const { result: categories } = useFetch(categoriesService.getAll);
  const { result: audiences } = useFetch(audiencesService.getAll);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState("");
  const [activeAudience, setActiveAudience] = useState<AudienceModel>(null);
  const navigate = useNavigate();

  const handleCategoryChange = async (
    category: CategoryModel,
    subCategory?: SubCategoryModel
  ) => {
    if (category || subCategory) {
      navigate(
        constructProductUrl({
          audience: activeAudience?._id,
          category: category?._id,
          subCategory: subCategory?._id,
        })
      );
    }
    setIsMobileMenuOpen("");
  };

  const renderItems = categories?.map((category) => (
    <li key={category._id}>
      <MenuItem placeholder={""} className="flex items-center gap-3 rounded-lg">
        <div className="flex items-center justify-center">
          <img src={category?.imageUrl} width={35} className="" />
        </div>
        <div>
          <Typography
            placeholder={""}
            variant="h6"
            color="black"
            className="flex items-center text-sm font-bold"
            onClick={() => {
              handleCategoryChange(category, null);
              setOpenMobileMenu(false);
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
                  handleCategoryChange(category, subCategory);
                  setIsMobileMenuOpen("");
                  setOpenMobileMenu(false);
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
          <div onMouseEnter={() => setActiveAudience(audience)}>
            <Menu offset={{ mainAxis: 10 }} placement="top" allowHover={true}>
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
                    selected={
                      activeAudience === audience ||
                      isMobileMenuOpen === audience?._id
                    }
                    onClick={() => {
                      isMobileMenuOpen === audience._id
                        ? setIsMobileMenuOpen("")
                        : setIsMobileMenuOpen(audience._id);
                    }}
                  >
                    {audience.name}
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`hidden h-3 w-3 transition-transform lg:block ${
                        activeAudience === audience ? "rotate-180" : ""
                      }`}
                    />
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`block h-3 w-3 transition-transform lg:hidden ${
                        isMobileMenuOpen === audience?._id ? "rotate-180" : ""
                      }`}
                    />
                  </ListItem>
                </Typography>
              </MenuHandler>
              <MenuList
                placeholder={""}
                className="hidden max-w-screen-xl rounded-xl lg:block"
              >
                <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
                  {renderItems}
                </ul>
              </MenuList>
            </Menu>
          </div>
          <div
            className=" lg:hidden grid grid-cols-1 gap-y-2 outline-none outline-0"
            style={{ justifyContent: "flex-start" }}
          >
            {renderItems && (
              <Collapse open={isMobileMenuOpen === audience._id}>
                {renderItems}
              </Collapse>
            )}
          </div>
        </React.Fragment>
      ))}
    </>
  );
}
