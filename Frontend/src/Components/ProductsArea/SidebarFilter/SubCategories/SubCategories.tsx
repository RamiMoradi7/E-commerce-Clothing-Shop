import { useEffect, useState } from "react";
import { CategoryModel } from "../../../../Models/CategoryModel";
import { SubCategoryModel } from "../../../../Models/SubCategoryModel";
import "./SubCategories.css";
interface SubCategoriesProps {
  selectedCategory: CategoryModel;
  defaultValue: string;
  setSearchParam: (key: string, value: string) => void;
}

export default function SubCategories({
  selectedCategory,
  defaultValue,
  setSearchParam,
}: SubCategoriesProps): JSX.Element {
  const [subCategories, setSubCategories] = useState<SubCategoryModel[]>();

  useEffect(() => {
    if (selectedCategory?._id) {
      setSubCategories(selectedCategory.subCategories);
    }
  }, [selectedCategory]);

  const handleClickSubCategory = (subCategoryId: string) => {
    if (subCategoryId === defaultValue) {
      setSearchParam("subCategory", "");
    } else {
      setSearchParam("subCategory", subCategoryId);
    }
  };
  return (
    <div className="subcategories-container">
      {subCategories?.map((s) => (
        <div
          key={s._id}
          className={`subcategory-item ${
            s._id === defaultValue ? "active" : ""
          }`}
          onClick={() => handleClickSubCategory(s._id)}
        >
          {s.name}
        </div>
      ))}
    </div>
  );
}
