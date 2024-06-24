import { Document, Schema, model } from "mongoose";
export interface IAudienceModel extends Document {
  name: string;
  description: string;
}

export const audienceSchema = new Schema<IAudienceModel>(
  {
    name: {
      type: String,
      required: [true, "Audience is missing."],
      trim: true,
      minlength: [2, "Audience too short"],
      maxlength: [25, "Audience cannot exceed 50 characters."],
    },
    description: {
      type: String,
      minlength: [10, "Audience description too short."],
      maxlength: [400, "description cannot exceed 400 characters."],
    },
  },
  {
    versionKey: false,
  }
);
export const AudienceModel = model<IAudienceModel>(
  "AudienceModel",
  audienceSchema,
  "audiences"
);
