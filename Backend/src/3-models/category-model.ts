import { Document, Schema, model } from "mongoose";
import { appConfig } from "../2-utils/app-config";
import { ISubCategoryModel } from "./sub-category-model";

export interface ICategoryModel extends Document {
  name: string;
  description: string;
  subCategories: ISubCategoryModel[];
  imageName: string;
}

const categorySchema = new Schema<ICategoryModel>(
  {
    name: {
      type: String,
      required: [true, "Category name is missing."],
      trim: true,
      minlength: [2, "Category name too short"],
      maxlength: [50, "Category name cannot exceed 50 characters."],
    },
    description: {
      type: String,
      minlength: [10, "Description too short."],
      maxlength: [600, "Description cannot exceed 300 characters."],
    },
    subCategories: [
      {
        type: Schema.Types.ObjectId,
        ref: "SubCategoryModel",
        required: [true, "Sub Category is missing..."],
      },
    ],
    imageName: { type: String },
  },
  {
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.imageName;
      },
    },
  }
);

categorySchema.virtual("imageUrl").get(function (this: ICategoryModel) {
  const baseImageUrl = appConfig.baseCategoryUrl;
  return baseImageUrl + this.imageName;
});

categorySchema.pre<ICategoryModel>("find", function (next) {
  this.populate("subCategories");
  next();
});

export const CategoryModel = model<ICategoryModel>(
  "CategoryModel",
  categorySchema,
  "categories"
);
