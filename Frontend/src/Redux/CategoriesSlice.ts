import { CategoryModel } from "../Models/CategoryModel";
import createGenericSlice from "./GenericSlice";

const initialState: CategoryModel[] = [];

export const categoriesSlice = createGenericSlice<CategoryModel>(
  "categories",
  initialState
);

export const {
  setAll: setCategories,
  addItem: addOneCategory,
  updateItem: updateCategory,
  deleteItem: deleteCategory,
} = categoriesSlice.actions;

export const categoryReducer = categoriesSlice.reducer;
export default categoriesSlice.actions;
