import {
  ResourceNotFoundError,
  ValidationError,
} from "../3-models/client-errors";
import {
  ISubCategoryModel,
  SubCategoryModel,
} from "../3-models/sub-category-model";
class SubCategoriesService {
  public async getSubCategories(): Promise<ISubCategoryModel[]> {
    return SubCategoryModel.find().exec();
  }
  public async getSubCategory(_id: string): Promise<ISubCategoryModel> {
    return SubCategoryModel.findById(_id).exec();
  }
  public async addMultipleSubCategories(
    subCategories: ISubCategoryModel[]
  ): Promise<ISubCategoryModel[]> {
    const addedSubCategories = await SubCategoryModel.insertMany(subCategories);
    return addedSubCategories;
  }

  public async updateSubCategory(
    subCategory: ISubCategoryModel
  ): Promise<ISubCategoryModel> {
    const errors = subCategory.validateSync();
    if (errors) throw new ValidationError(errors.message);
    const updatedSubCategory = await SubCategoryModel.findByIdAndUpdate(
      subCategory._id,
      subCategory,
      { new: true }
    );
    if (!updatedSubCategory) throw new ResourceNotFoundError(subCategory._id);
    return updatedSubCategory;
  }
  public async deleteSubCategory(_id: string): Promise<void> {
    const subCategoryToDelete = await SubCategoryModel.findByIdAndDelete(_id);
    if (!subCategoryToDelete) throw new ResourceNotFoundError(_id);
  }
}
export const subCategoriesService = new SubCategoriesService();
