import { Document, Schema, model } from "mongoose";
import { appConfig } from "../2-utils/app-config";
export interface IBrandModel extends Document {
  name: string;
  imageName: string;
}

export const brandSchema = new Schema<IBrandModel>(
  {
    name: {
      type: String,
      required: [true, "Brand name is missing."],
      trim: true,
      minlength: [1, "Brand name too short"],
      maxlength: [25, "Brand name cannot exceed 50 characters."],
    },
    imageName: {
      type: String,
    },
  },
  {
    versionKey: false,
    id: false,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.imageName;
      },
    },
  }
);
brandSchema.virtual("imageUrl").get(function (this: IBrandModel) {
  const baseImageUrl = appConfig.baseBrandUrl;
  return baseImageUrl + this.imageName;
});

export const BrandModel = model<IBrandModel>(
  "BrandModel",
  brandSchema,
  "brands"
);
