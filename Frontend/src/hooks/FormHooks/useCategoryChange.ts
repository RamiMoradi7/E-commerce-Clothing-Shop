import { useState } from "react";
import { CategoryModel } from "../../Models/CategoryModel";
import { SizeModel } from "../../Models/SizeModel";
import { sizesService } from "../../Services/SizesService";

export function useCategoryChange() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryModel | null>(null);
  const [sizes, setSizes] = useState<SizeModel[]>([]);

  const handleCategoryChange = async (category: CategoryModel) => {
    setSelectedCategory(category);
    const availableSizes =
      category?.name.toLowerCase() === "footwear"
        ? await sizesService.getShoeSizes()
        : await sizesService.getSizes();
    setSizes(availableSizes);
  };

  return {
    handleCategoryChange,
    setSelectedCategory,
    selectedCategory,
    sizes,
  };
}
