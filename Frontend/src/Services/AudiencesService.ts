import { AudienceModel } from "../Models/AudienceModel";
import { audienceActions } from "../Redux/AudienceSlice";
import { appConfig } from "../Utils/AppConfig";
import { GenericService } from "./GenericService";

export const audiencesService = new GenericService<AudienceModel>(
  appConfig.audiencesUrl,
  "audiences",
  audienceActions
);
