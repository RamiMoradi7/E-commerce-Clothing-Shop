import { Document, Schema, model } from "mongoose";

export interface ISubCategoryModel extends Document {
  name: string;
}

const subCategorySchema = new Schema<ISubCategoryModel>(
  {
    name: {
      type: String,
      required: [true, "sub category name is missing."],
      trim: true,
      minlength: [2, "sub category name too short"],
      maxlength: [50, "sub category name cannot exceed 50 characters."],
    },
  },
  {
    versionKey: false,
    id: false,
  }
);

export const SubCategoryModel = model<ISubCategoryModel>(
  "SubCategoryModel",
  subCategorySchema,
  "sub-categories"
);
