import axios from "axios";

import { appConfig } from "../Utils/AppConfig";
import { SizeModel } from "../Models/SizeModel";

class SizesService {
  public async getSizes(): Promise<SizeModel[]> {
    const response = await axios.get<SizeModel[]>(appConfig.sizesUrl);
    const sizes = response.data;
    return sizes;
  }
  public async getShoeSizes(): Promise<SizeModel[]> {
    const response = await axios.get<SizeModel[]>(appConfig.shoeSizesUrl);
    const shoeSizes = response.data;
    return shoeSizes;
  }

  public async getSize(_id: string, sizeType: string): Promise<SizeModel> {
    const url =
      sizeType === "shoe-size" ? appConfig.shoeSizesUrl : appConfig.sizesUrl;
    const response = await axios.get<SizeModel>(url + _id);
    const size = response.data;
    return size;
  }

  public async addSize(size: SizeModel): Promise<void> {
    debugger;
    switch (size.type.toLowerCase()) {
      case "cloth-size":
      case "accessory-size":
        delete size.type;
        await axios.post<SizeModel>(appConfig.sizesUrl, size);
        break;
      case "shoe-size":
        delete size.type;
        await axios.post<SizeModel>(appConfig.shoeSizesUrl, size);
        break;
    }
  }
  public async updateSize(size: SizeModel): Promise<void> {
    switch (size.type.toLowerCase()) {
      case "clothsizemodel":
      case "accessorysizemodel":
        await axios.put<SizeModel>(appConfig.sizesUrl + size._id, size);
        break;
      case "shoesizemodel":
        await axios.put<SizeModel>(appConfig.shoeSizesUrl + size._id, size);
        break;
    }
  }
  public async deleteShoeSize(_id: string): Promise<void> {
    await axios.delete<SizeModel>(appConfig.shoeSizesUrl + _id);
  }
  public async deleteClothSize(_id: string): Promise<void> {
    await axios.delete<SizeModel>(appConfig.sizesUrl + _id);
  }
}
export const sizesService = new SizesService();
