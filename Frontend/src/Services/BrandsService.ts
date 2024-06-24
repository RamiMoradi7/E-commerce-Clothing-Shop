import { BrandModel } from "../Models/BrandModel";
import { brandActions } from "../Redux/BrandsSlice";
import { appConfig } from "../Utils/AppConfig";
import { GenericService } from "./GenericService";

export const brandsService = new GenericService<BrandModel>(
  appConfig.brandsUrl,
  "brands",
  brandActions
);
