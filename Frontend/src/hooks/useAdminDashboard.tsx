import { useState } from "react";
import Products from "../Components/AdminArea/Products/Products";
import Audiences from "../Components/AdminArea/Audiences/Audiences";
import Categories from "../Components/AdminArea/Categories/Categories";
import Brands from "../Components/AdminArea/Brands/Brands";
import Sizes from "../Components/AdminArea/Sizes/Sizes";
import Colors from "../Components/AdminArea/Colors/Colors";

export const useAdminDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Products");

  const handleMenuItemClick = (menuItem: string) =>
    setSelectedMenuItem(menuItem);

  const renderMenuItem = () => {
    switch (selectedMenuItem) {
      case "Products":
        return <Products />;
      case "Audiences":
        return <Audiences />;
      case "Categories":
        return <Categories />;
      case "Brands":
        return <Brands />;
      case "Sizes":
        return <Sizes />;
      case "Colors":
        return <Colors />;
    }
  };
  return {
    isMenuOpen,
    setIsMenuOpen,
    selectedMenuItem,
    handleMenuItemClick,
    renderMenuItem,
  };
};
