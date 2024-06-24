import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";

function register(
  currentState: UserModel,
  action: PayloadAction<UserModel>
): UserModel {
  const newState = action.payload;
  return newState;
}

function login(
  currentState: UserModel,
  action: PayloadAction<UserModel>
): UserModel {
  const newState = action.payload;
  return newState;
}

function logOut(currentState: UserModel, action: PayloadAction): UserModel {
  return null;
}
const authSlice = createSlice({
  name: "auth",
  initialState: null,
  reducers: { register, login, logOut },
});

export const authActions = authSlice.actions;
export const authReducers = authSlice.reducer;
