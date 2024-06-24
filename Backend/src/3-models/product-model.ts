import { Document, Schema, Types, model } from "mongoose";
import { appConfig } from "../2-utils/app-config";
import { ColorModel } from "./color-model";
import { IClothSizeModel, IShoeSizeModel, SizeModel } from "./size-model";
export interface IStock {
  color: Types.ObjectId;
  size: Types.ObjectId;
  quantity: number;
}

export interface IProductModel extends Document {
  audienceId: Types.ObjectId;
  categoryId: Types.ObjectId;
  subCategoryId: Types.ObjectId;
  brandId: Types.ObjectId;
  name: string;
  price: number;
  discount?: number;
  description: string;
  stock: IStock[];
  imageNames: string[];
}

const productSchema = new Schema<IProductModel>(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "CategoryModel",
      required: [true, "Category id is missing."],
    },
    subCategoryId: {
      type: Schema.Types.ObjectId,
      ref: "SubCategoryModel",
      required: [true, "Sub category is missing."],
    },
    audienceId: {
      type: Schema.Types.ObjectId,
      ref: "AudienceModel",
      required: [true, "Audience is required."],
    },
    brandId: {
      type: Schema.Types.ObjectId,
      ref: "BrandModel",
      required: [true, "Brand is missing."],
    },
    name: {
      type: String,
      required: [true, "Product name is missing."],
      minlength: [2, "Product name too short."],
      maxlength: [50, "Product name cannot exceed 50 characters."],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is missing."],
      min: [0, "Price cannot be negative."],
      max: [1000, "Price cannot exceed 1000."],
    },
    discount: { type: Number, default: 0 },
    description: { type: String, required: [true, "Description is missing."] },
    stock: [
      {
        color: { type: Schema.Types.ObjectId, ref: ColorModel },
        size: { type: Schema.Types.ObjectId, ref: SizeModel },
        quantity: { type: Number, default: 0 },
      },
    ],
    imageNames: [
      {
        type: String,
      },
    ],
  },
  {
    versionKey: false,
    id: false,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.imageNames;
        delete ret.sizes;
      },
    },
  }
);

productSchema.virtual("category", {
  ref: "CategoryModel",
  foreignField: "_id",
  localField: "categoryId",
  justOne: true,
});
productSchema.virtual("audience", {
  ref: "AudienceModel",
  foreignField: "_id",
  localField: "audienceId",
  justOne: true,
});
productSchema.virtual("brand", {
  ref: "BrandModel",
  foreignField: "_id",
  localField: "brandId",
  justOne: true,
});
productSchema.virtual("subCategory", {
  ref: "SubCategoryModel",
  foreignField: "_id",
  localField: "subCategoryId",
  justOne: true,
});

productSchema.virtual("imageUrls").get(function (this: IProductModel) {
  let baseImageUrl: string;
  switch (this.constructor) {
    case ShoeModel:
      baseImageUrl = appConfig.baseShoeUrl;
      break;
    case ClothModel:
      baseImageUrl = appConfig.baseClothUrl;
      break;
    case AccessoryModel:
      baseImageUrl = appConfig.baseAccessoryUrl;
      break;
    default:
      throw new Error("Unsupported model type");
  }
  return this.imageNames.map((imageName) => baseImageUrl + imageName);
});

export interface IClothModel extends IProductModel {
  sizes: IClothSizeModel[];
}
const clothSchema = new Schema<IClothModel>({
  sizes: [{ type: Schema.Types.ObjectId, ref: "SizeModel" }],
});

export interface IShoeModel extends IProductModel {
  sizes: IShoeSizeModel[];
}
const shoeSchema = new Schema<IShoeModel>({
  sizes: [{ type: Schema.Types.ObjectId, ref: "SizeModel" }],
});
export interface IAccessoryModel extends IProductModel {
  sizes: IClothSizeModel[];
}
const accessorySchema = new Schema<IAccessoryModel>({
  sizes: [{ type: Schema.Types.ObjectId, ref: "SizeModel" }],
});

export const ProductModel = model<IProductModel>(
  "ProductModel",
  productSchema,
  "products"
);

export const ClothModel = ProductModel.discriminator<IClothModel>(
  "Cloth",
  clothSchema
);

export const ShoeModel = ProductModel.discriminator<IShoeModel>(
  "Shoe",
  shoeSchema
);

export const AccessoryModel = ProductModel.discriminator<IAccessoryModel>(
  "Accessory",
  accessorySchema
);
