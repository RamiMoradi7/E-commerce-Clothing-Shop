import { UploadedFile } from "express-fileupload";
import { imageHandler } from "../2-utils/image.handler";
import { imagesHandler } from "../2-utils/images-handler";
import { BrandModel, IBrandModel } from "../3-models/brand-model";
import {
  ResourceNotFoundError,
  ValidationError,
} from "../3-models/client-errors";
export type BrandProps = {
  brand: IBrandModel;
  image?: UploadedFile;
};

class BrandsService {
  public async getBrands(): Promise<IBrandModel[]> {
    return BrandModel.find().exec();
  }
  public async getBrand(_id: string): Promise<IBrandModel> {
    return BrandModel.findById(_id).exec();
  }
  public async addBrand({ brand, image }: BrandProps): Promise<IBrandModel> {
    const errors = brand.validateSync();
    if (errors) throw new ValidationError(errors.message);
    imagesHandler.configureFileSaver("1-assets", "brand-images");
    const imageName = await imageHandler.convertImageToImageName(image);
    brand.imageName = imageName;
    return brand.save();
  }
  public async updateBrand({ brand, image }: BrandProps): Promise<IBrandModel> {
    const errors = brand.validateSync();
    if (errors) throw new ValidationError(errors.message);
    imagesHandler.configureFileSaver("1-assets", "brand-images");
    const newImageName = await imageHandler.updateImageName(
      BrandModel,
      brand._id,
      image
    );
    brand.imageName = newImageName;
    const updatedBrand = await BrandModel.findByIdAndUpdate(brand._id, brand, {
      new: true,
    });
    if (!updatedBrand) throw new ResourceNotFoundError(brand._id);
    return updatedBrand;
  }
  public async deleteBrand(_id: string): Promise<void> {
    const brandToDelete = await BrandModel.findByIdAndDelete(_id);
    if (!brandToDelete) {
      throw new ResourceNotFoundError(_id);
    }
    await imageHandler.deleteImageName(brandToDelete.imageName);
  }
}
export const brandsService = new BrandsService();
