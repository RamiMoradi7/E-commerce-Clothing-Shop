import axios from "axios";
import { CategoryModel } from "../Models/CategoryModel";
import { SubCategoryModel } from "../Models/SubCategoryModel";
import { categoriesSlice } from "../Redux/CategoriesSlice";
import { appConfig } from "../Utils/AppConfig";
import { GenericService } from "./GenericService";

class CategoriesService extends GenericService<CategoryModel> {
  constructor() {
    super(appConfig.categoriesUrl, "categories", categoriesSlice.actions);
  }

  public async getSubCategoriesByCategory(
    _id: string
  ): Promise<SubCategoryModel[]> {
    const response = await axios.get<SubCategoryModel[]>(
      appConfig.subCategoriesByCategoryUrl + _id
    );
    const subCategories = response.data;
    return subCategories;
  }
}

export const categoriesService = new CategoriesService();
