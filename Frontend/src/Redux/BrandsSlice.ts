import { BrandModel } from "../Models/BrandModel";
import createGenericSlice from "./GenericSlice";

const initialState: BrandModel[] = [];

const brandsSlice = createGenericSlice<BrandModel>("brands", initialState);

export const {
  setAll: setBrands,
  addItem: addBrand,
  updateItem: updateBrand,
  deleteItem: deleteBrand,
} = brandsSlice.actions;

export const brandReducer = brandsSlice.reducer;
export const brandActions = brandsSlice.actions;
