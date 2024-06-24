import { UploadedFile } from "express-fileupload";
import { FilterQuery } from "mongoose";
import { imageHandler } from "../2-utils/image.handler";
import { imagesHandler } from "../2-utils/images-handler";
import { CategoryModel, ICategoryModel } from "../3-models/category-model";
import {
  ResourceNotFoundError,
  ValidationError,
} from "../3-models/client-errors";
import { ISubCategoryModel } from "../3-models/sub-category-model";

type CategoryProps = {
  category: ICategoryModel;
  image?: UploadedFile;
};

class CategoriesService {
  public async getCategories(
    queryFilters?: FilterQuery<ICategoryModel>
  ): Promise<ICategoryModel[]> {
    if (queryFilters) {
      return CategoryModel.find(queryFilters).exec();
    } else {
      return CategoryModel.find().exec();
    }
  }
  public async getCategory(_id: string): Promise<ICategoryModel> {
    return CategoryModel.findById(_id).populate("subCategories").exec();
  }

  public async getCategoryByName(name: string): Promise<ICategoryModel | null> {
    const category = CategoryModel.find({ name })
      .populate("subCategories")
      .exec();
    return category[0];
  }
  public async getSubCategoriesByCategory(
    _id: string
  ): Promise<ISubCategoryModel[]> {
    try {
      const category = await CategoryModel.findById(_id).populate(
        "subCategories"
      );
      if (!category) {
        return null;
      }
      const subCategories = category.subCategories.map((subCategory) =>
        subCategory.toObject()
      );
      return subCategories;
    } catch (error) {
      console.error("Error fetching subcategories by category:", error);
      return null;
    }
  }
  public async addCategory({
    category,
    image,
  }: CategoryProps): Promise<ICategoryModel> {
    const errors = category.validateSync();
    if (errors) throw new ValidationError(errors.message);
    imagesHandler.configureFileSaver("1-assets", "category-images");
    const imageName = await imageHandler.convertImageToImageName(image);
    category.imageName = imageName;
    const addedCategory = await CategoryModel.create(category);
    category = await this.getCategory(addedCategory._id);
    return category;
  }
  public async updateCategory({
    category,
    image,
  }: CategoryProps): Promise<ICategoryModel> {
    const errors = category.validateSync();
    if (errors) throw new ValidationError(errors.message);
    imagesHandler.configureFileSaver("1-assets", "category-images");
    const newImageName = await imageHandler.updateImageName(
      CategoryModel,
      category._id,
      image
    );
    category.imageName = newImageName;
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      category._id,
      category,
      {
        new: true,
      }
    );
    if (!updatedCategory) throw new ResourceNotFoundError(category._id);
    category = await this.getCategory(updatedCategory._id);
    return category;
  }
  public async deleteCategory(_id: string): Promise<void> {
    const categoryToDelete = await CategoryModel.findByIdAndDelete(_id);
    if (!categoryToDelete) {
      throw new ResourceNotFoundError(_id);
    }
    await imageHandler.deleteImageName(categoryToDelete.imageName);
  }
}

export const categoriesService = new CategoriesService();
