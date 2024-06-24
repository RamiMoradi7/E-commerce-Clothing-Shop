import { Document, Schema, model } from "mongoose";
import { RoleModel } from "./role-model";

export interface IUserModel extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: RoleModel;
}

export const userSchema = new Schema<IUserModel>(
  {
    firstName: {
      type: String,
      required: [true, "First name is missing."],
      trim: true,
      minlength: [2, "First name too short."],
      maxlength: [35, "First name too long."],
    },
    lastName: {
      type: String,
      required: [true, "Last name is missing."],
      trim: true,
      minlength: [2, "Last name too short."],
      maxlength: [50, "Last name too long."],
    },
    email: {
      type: String,
      required: [true, "Email is missing."],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is missing."],
      trim: true,
      minlength: [4, "Password too short."],
      maxlength: [256, "Password too long."],
    },
    roleId: {
      type: Number,
      required: false,
      validate: {
        validator: (value: number) =>
          [RoleModel.Admin, RoleModel.User].includes(value),
        message: "Invalid role id.",
      },
    },
  },
  {
    versionKey: false,
  }
);
export const UserModel = model<IUserModel>("UserModel", userSchema, "users");
