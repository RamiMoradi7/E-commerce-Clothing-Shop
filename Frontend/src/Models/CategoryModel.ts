import { SubCategoryModel } from "./SubCategoryModel";

export class CategoryModel {
  public _id: string;
  public name: string;
  public description: string;
  public subCategories: SubCategoryModel[];
  public imageUrl: string;
  public image: File;
}
