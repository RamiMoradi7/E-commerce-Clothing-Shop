import axios from "axios";
import { ColorModel } from "../Models/ColorModel";
import { appConfig } from "../Utils/AppConfig";

class ColorsService {
  public async getColors(): Promise<ColorModel[]> {
    const response = await axios.get<ColorModel[]>(appConfig.colorsUrl);
    const colors = response.data;
    return colors;
  }
  public async getColor(_id: string): Promise<ColorModel> {
    const response = await axios.get<ColorModel>(appConfig.colorsUrl + _id);
    const color = response.data;
    return color;
  }
  public async addColor(color: ColorModel): Promise<void> {
    const response = await axios.post<ColorModel>(appConfig.colorsUrl, color);
    const addedColor = response.data;
    console.log(addedColor);
  }
  public async updateColor(color: ColorModel): Promise<void> {
    const response = await axios.put<ColorModel>(
      appConfig.colorsUrl + color._id,
      color
    );
    const updatedColor = response.data;
    console.log(updatedColor);
  }
  public async deleteColor(_id: string): Promise<void> {
    await axios.delete<ColorModel>(appConfig.colorsUrl + _id);
  }
}
export const colorsService = new ColorsService();
