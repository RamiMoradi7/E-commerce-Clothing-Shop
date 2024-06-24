import { AudienceModel } from "../Models/AudienceModel";
import createGenericSlice from "./GenericSlice";

const initialState: AudienceModel[] = [];

const audienceSlice = createGenericSlice<AudienceModel>(
  "audiences",
  initialState
);

export const {
  setAll: setAudiences,
  addItem: addAudience,
  updateItem: updateAudience,
  deleteItem: deleteAudience,
} = audienceSlice.actions;

export const audienceReducer = audienceSlice.reducer;

export const audienceActions = audienceSlice.actions;
