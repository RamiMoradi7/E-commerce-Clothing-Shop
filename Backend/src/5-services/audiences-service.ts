import { AudienceModel, IAudienceModel } from "../3-models/audience-model";
import {
  ResourceNotFoundError,
  ValidationError,
} from "../3-models/client-errors";

class AudiencesService {
  public async getAudiences(): Promise<IAudienceModel[]> {
    return AudienceModel.find().exec();
  }
  public async getAudience(_id: string): Promise<IAudienceModel> {
    return AudienceModel.findById(_id).exec();
  }
  public async addAudience(audience: IAudienceModel): Promise<IAudienceModel> {
    const errors = audience.validateSync();
    if (errors) throw new ValidationError(errors.message);
    return audience.save();
  }
  public async updateAudience(
    audience: IAudienceModel
  ): Promise<IAudienceModel> {
    const errors = audience.validateSync();
    if (errors) throw new ValidationError(errors.message);
    const updatedAudience = await AudienceModel.findByIdAndUpdate(
      audience._id,
      audience,
      { new: true }
    );
    if (!updatedAudience) throw new ResourceNotFoundError(audience._id);
    return updatedAudience;
  }
  public async deleteAudience(_id: string): Promise<void> {
    const deletedAudience = await AudienceModel.findByIdAndDelete(_id);
    if (!deletedAudience) throw new ResourceNotFoundError(_id);
  }
}
export const audiencesService = new AudiencesService();
