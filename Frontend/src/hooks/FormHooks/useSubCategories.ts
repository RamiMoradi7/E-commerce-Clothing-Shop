import { ChangeEvent, useState } from "react";
import { SubCategoryModel } from "../../Models/SubCategoryModel";

export function useSubCategories() {
  const [subCategories, setSubCategories] = useState<SubCategoryModel[]>([]);
  const addSubCategory = () => {
    setSubCategories((prevSubCategory) => [
      ...prevSubCategory,
      new SubCategoryModel(),
    ]);
  };
  const removeSubCategory = (index: number) => {
    const updatedCategories = [...subCategories];
    updatedCategories.splice(index, 1);
    setSubCategories(updatedCategories);
  };
  const handleUpdateSubCategoryValue = (
    event: ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const updatedSubCategories = subCategories.map((subCategory) =>
      subCategory.name === name
        ? { ...subCategory, name: event.target.value }
        : subCategory
    );
    setSubCategories(updatedSubCategories);
  };

  return {
    subCategories,
    setSubCategories,
    addSubCategory,
    removeSubCategory,
    handleUpdateSubCategoryValue,
  };
}
