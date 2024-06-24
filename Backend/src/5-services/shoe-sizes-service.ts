import {
  ResourceNotFoundError,
  ValidationError,
} from "../3-models/client-errors";
import { IShoeSizeModel, ShoeSizeModel } from "../3-models/size-model";

class ShoeSizesService {
  public async getShoeSizes(): Promise<IShoeSizeModel[]> {
    return ShoeSizeModel.find().exec();
  }
  public async getShoeSize(_id: string): Promise<IShoeSizeModel> {
    return ShoeSizeModel.findById(_id).exec();
  }
  public async addShoeSize(shoeSize: IShoeSizeModel): Promise<IShoeSizeModel> {
    const errors = shoeSize.validateSync();
    if (errors) throw new ValidationError(errors.message);
    return shoeSize.save();
  }
  public async updateShoeSize(
    shoeSize: IShoeSizeModel
  ): Promise<IShoeSizeModel> {
    const errors = shoeSize.validateSync();
    if (errors) throw new ValidationError(errors.message);
    const updatedShoeSize = await ShoeSizeModel.findByIdAndUpdate(
      shoeSize._id,
      shoeSize,
      { new: true }
    );
    if (!updatedShoeSize) throw new ResourceNotFoundError(shoeSize._id);
    return updatedShoeSize;
  }
  public async deleteShoeSize(_id: string): Promise<void> {
    const deletedSize = await ShoeSizeModel.findByIdAndDelete(_id);
    if (!deletedSize) throw new ResourceNotFoundError(_id);
  }
}
export const shoeSizesService = new ShoeSizesService();
