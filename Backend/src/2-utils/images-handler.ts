import { Model } from "mongoose";
import { ResourceNotFoundError } from "../3-models/client-errors";
import { IProductModel } from "../3-models/product-model";
import { Request, Response, NextFunction } from "express";
import { UploadedFile } from "express-fileupload";
import { fileSaver } from "uploaded-file-saver";
import path from "path";
class ImagesHandler {
  public async getImageNames<T extends IProductModel>(
    model: Model<T>,
    _id: string
  ): Promise<string[]> {
    try {
      const product = await model.findById(_id).select("imageNames");
      if (!product) {
        throw new ResourceNotFoundError(_id);
      }
      const imageNames = product.imageNames || [];
      return imageNames;
    } catch (error) {
      console.log(error);
    }
  }
  public async extractImagesFromRequest(
    request: Request
  ): Promise<UploadedFile[]> {
    try {
      let imagesArray: UploadedFile[] = [];
      const images = request.files.images;
      Array.isArray(images) ? (imagesArray = images) : imagesArray.push(images);
      return imagesArray;
    } catch (error) {
      console.log(error);
    }
  }
  public async getImageFile(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { imageName, folderPath } = request.params;
      const fullImagePath = path.resolve(
        __dirname,
        "..",
        "1-assets",
        folderPath,
        imageName
      );

      response.sendFile(fullImagePath);
    } catch (err: any) {
      next(err);
    }
  }
  public configureFileSaver(folder1: string, folder2: string): void {
    const basePath = path.resolve(__dirname, "../");
    const assetPath = path.join(basePath, `${folder1}`, `${folder2}`);
    fileSaver.config(assetPath);
  }

  public async addImagesToImageNames(
    images: UploadedFile[]
  ): Promise<string[]> {
    const imageArray: UploadedFile[] = Array.from(images);
    const imageNames = await Promise.all(
      imageArray.map(async (image) => await fileSaver.add(image))
    );
    return imageNames;
  }
  public async updateImageNames<T extends IProductModel>(
    model: Model<T>,
    _id: string,
    images: UploadedFile[]
  ): Promise<string[]> {
    try {
      const oldImageNames = await this.getImageNames<T>(model, _id);

      if (images && images.length > 0) {
        const imageArray: UploadedFile[] = Array.from(images);
        const imageNames = await Promise.all(
          imageArray.map(async (image, index) => {
            const oldImageName = oldImageNames[index];
            const newImageName = await fileSaver.update(oldImageName, image);
            return newImageName;
          })
        );

        if (oldImageNames.length > images.length) {
          const remainingOldImageNames = oldImageNames.slice(images.length);
          await Promise.all(
            remainingOldImageNames.map(async (oldImageName) => {
              await fileSaver.delete(oldImageName);
            })
          );
        }
        return imageNames;
      } else {
        return oldImageNames;
      }
    } catch (err: any) {
      console.log(err);
      throw new Error("Failed to update image names");
    }
  }
  public async deleteImageNames(imageNames: string[]) {
    try {
      console.log(imageNames);
      await Promise.all(
        imageNames.map(async (imageName) => await fileSaver.delete(imageName))
      );
    } catch (err: any) {
      console.log(err.message);
    }
  }
}

export const imagesHandler = new ImagesHandler();
