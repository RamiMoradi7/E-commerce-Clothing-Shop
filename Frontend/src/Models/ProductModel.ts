import { Stock } from "../types/Stock";
import { AudienceModel } from "./AudienceModel";
import { BrandModel } from "./BrandModel";
import { CategoryModel } from "./CategoryModel";
import { SubCategoryModel } from "./SubCategoryModel";

export class ProductModel {
  public _id: string;
  public audienceId: string;
  public categoryId: string;
  public subCategoryId: string;
  public brandId: string;
  public name: string;
  public price: number;
  public discount: number;
  public description: string;
  public stock: Stock[];
  public imageUrls: string[];
  public category: CategoryModel;
  public subCategory: SubCategoryModel;
  public brand: BrandModel;
  public audience: AudienceModel;
  public images: FileList;
  public __t: string;
}
