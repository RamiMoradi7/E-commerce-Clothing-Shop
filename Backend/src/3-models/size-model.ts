import { Document, Schema, model } from "mongoose";

export interface ISizeModel extends Document {
  name: string;
}
export const sizeSchema = new Schema<ISizeModel>(
  {
    name: {
      type: String,
      required: [true, "Size is missing"],
      trim: true,
    },
  },
  {
    versionKey: false,
    discriminatorKey: "type",
  }
);

export interface IClothSizeModel extends ISizeModel {}
const clothSizeSchema = new Schema<IClothSizeModel>({});

export interface IShoeSizeModel extends ISizeModel {}
const shoeSizeSchema = new Schema<IShoeSizeModel>({});

const SizeModel = model<ISizeModel>("SizeModel", sizeSchema, "sizes");
const ClothSizeModel = SizeModel.discriminator<IClothSizeModel>(
  "ClothSizeModel",
  clothSizeSchema
);
const ShoeSizeModel = SizeModel.discriminator<IShoeSizeModel>(
  "ShoeSizeModel",
  shoeSizeSchema
);

export { SizeModel, ClothSizeModel, ShoeSizeModel };
