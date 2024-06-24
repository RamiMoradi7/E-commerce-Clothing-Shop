import axios from "axios";
import { SubCategoryModel } from "../Models/SubCategoryModel";
import { appConfig } from "../Utils/AppConfig";

class SubCategoriesService {
  public async getSubCategories(): Promise<SubCategoryModel[]> {
    const response = await axios.get<SubCategoryModel[]>(
      appConfig.subCategoriesUrl
    );
    const subCategories = response.data;
    return subCategories;
  }
  public async getSubCategory(_id: string): Promise<SubCategoryModel> {
    const response = await axios.get<SubCategoryModel>(
      appConfig.subCategoriesUrl + _id
    );
    const subCategory = response.data;
    return subCategory;
  }
  public async addSubCategory(
    subCategories: SubCategoryModel[]
  ): Promise<SubCategoryModel[]> {
    const response = await axios.post<SubCategoryModel[]>(
      appConfig.subCategoriesUrl,
      subCategories
    );
    const addedSubCategories = response.data;
    return addedSubCategories;
  }
  public async updateSubCategory(
    subCategory: Partial<SubCategoryModel>
  ): Promise<void> {
    const response = await axios.put<SubCategoryModel>(
      appConfig.subCategoriesUrl + subCategory._id,
      subCategory
    );
    const updatedSubCategory = response.data;
    console.log(updatedSubCategory);
  }
}

export const subCategoriesService = new SubCategoriesService();
