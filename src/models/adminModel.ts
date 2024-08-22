import { Schema, model, Document } from "mongoose";

export interface IAdmin extends Document {
  username: string;
  email: string;
  password: string;
  role: "admin";
}

const adminSchema = new Schema<IAdmin>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
  },
  { timestamps: true }
);

export const Admin = model<IAdmin>("Admin", adminSchema);
