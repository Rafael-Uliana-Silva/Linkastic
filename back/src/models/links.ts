import { Schema, model, Document } from "mongoose";

interface UserLinks extends Document {
  title: string;
  link: string;
}

const linkSchema = new Schema<UserLinks>({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const Links = model<UserLinks>("Link", linkSchema);

export {Links, linkSchema, UserLinks};
