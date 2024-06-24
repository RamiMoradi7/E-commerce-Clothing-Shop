import {
  ResourceNotFoundError,
  ValidationError,
} from "../3-models/client-errors";
import { ClothSizeModel, IClothSizeModel } from "../3-models/size-model";
class ClothSizeService {
  public async getClothSizes(): Promise<IClothSizeModel[]> {
    return ClothSizeModel.find().exec();
  }
  public async getClothSize(_id: string): Promise<IClothSizeModel> {
    return ClothSizeModel.findById(_id).exec();
  }
  public async addClothSize(
    clothSize: IClothSizeModel
  ): Promise<IClothSizeModel> {
    const errors = clothSize.validateSync();
    if (errors) throw new ValidationError(errors.message);
    return clothSize.save();
  }
  public async updateClothSize(
    clothSize: IClothSizeModel
  ): Promise<IClothSizeModel> {
    const errors = clothSize.validateSync();
    if (errors) throw new ValidationError(errors.message);
    const updatedClothSize = await ClothSizeModel.findByIdAndUpdate(
      clothSize._id,
      clothSize,
      { new: true }
    );
    if (!updatedClothSize) throw new ResourceNotFoundError(clothSize._id);
    return updatedClothSize;
  }
  public async deleteClothSize(_id: string): Promise<void> {
    const deletedSize = await ClothSizeModel.findByIdAndDelete(_id);
    if (!deletedSize) throw new ResourceNotFoundError(_id);
  }
}
export const clothSizeService = new ClothSizeService();
