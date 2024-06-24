import { ColorModel } from "../Models/ColorModel";
import { SizeModel } from "../Models/SizeModel";

export class Stock {
  color: ColorModel;
  size: SizeModel;
  quantity: number;
  _id?: string;
}
