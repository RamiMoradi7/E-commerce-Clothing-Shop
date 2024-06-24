import { UploadedFile } from "express-fileupload";
import { Model } from "mongoose";
import { fileSaver } from "uploaded-file-saver";
import { ResourceNotFoundError } from "../3-models/client-errors";
import { ICategoryModel } from "../3-models/category-model";
import { IBrandModel } from "../3-models/brand-model";

class ImageHandler {
  public async convertImageToImageName(image: UploadedFile): Promise<string> {
    if (image) {
      const imageName = await fileSaver.add(image);
      return imageName;
    }
  }
  public async getImageName<T extends ICategoryModel | IBrandModel>(
    model: Model<T>,
    _id: string
  ): Promise<string> {
    try {
      const value = await model.findById(_id).select("imageName");
      if (!value) {
        throw new ResourceNotFoundError(_id);
      }
      const imageName = value.imageName || "";
      return imageName;
    } catch (err: any) {
      console.log(err.message);
    }
  }

  public async updateImageName<T extends ICategoryModel | IBrandModel>(
    model: Model<T>,
    _id: string,
    image: UploadedFile
  ): Promise<string> {
    const oldImageName = await this.getImageName(model, _id);
    const newImageName = image
      ? await fileSaver.update(oldImageName, image)
      : oldImageName;
    return newImageName;
  }
  public async deleteImageName(imageName: string): Promise<void> {
    await fileSaver.delete(imageName);
  }
}
export const imageHandler = new ImageHandler();
