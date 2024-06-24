import { Document, Schema, model } from "mongoose";
import { IUserModel } from "./user-model";

export interface ICredentialsModel
  extends Pick<IUserModel, "email" | "password">,
    Document {}

export const credentialsSchema = new Schema<ICredentialsModel>(
  {
    email: {
      type: String,
      required: [true, "Email is missing."],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is missing."],
      minlength: [4, "Password too short."],
      maxlength: [256, "Password too long."],
    },
  },
  { autoCreate: false }
);
export const CredentialsModel = model<ICredentialsModel>(
  "CredentialsModel",
  credentialsSchema
);
