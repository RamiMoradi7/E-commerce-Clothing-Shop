import { Document, Schema, model } from "mongoose";
export interface IColorModel extends Document {
  name: string;
  hex: string;
}
export const colorSchema = new Schema<IColorModel>(
  {
    name: {
      type: String,
      required: [true, "Color is missing."],
      trim: true,
    },
    hex: {
      type: String,
      required: [true, "Hex code is missing."],
    },
  },
  {
    versionKey: false,
  }
);

export const ColorModel = model<IColorModel>(
  "ColorModel",
  colorSchema,
  "colors"
);
