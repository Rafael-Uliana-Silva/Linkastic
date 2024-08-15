import { Schema, model, Document, Types } from "mongoose";
import { UserLinks, linkSchema } from "./links";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  criado: Date;
  admin: boolean;
  links: Types.DocumentArray<UserLinks>;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  criado: {
    type: Date,
    default: Date.now,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  links: [linkSchema],
})

const User = model<IUser>("User", userSchema);

export default User;
