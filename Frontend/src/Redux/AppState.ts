import { AudienceModel } from "../Models/AudienceModel";
import { BrandModel } from "../Models/BrandModel";
import { CategoryModel } from "../Models/CategoryModel";
import { UserModel } from "../Models/UserModel";
import { CartProps } from "./CartSlice";
import { ProductsState } from "./ProductsSlice";

export type AppState = {
  user: UserModel;
  result: ProductsState;
  audiences: AudienceModel[];
  cart: CartProps;
  categories: CategoryModel[];
  brands: BrandModel[];
};
