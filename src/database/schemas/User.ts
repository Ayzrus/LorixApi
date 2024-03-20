import { Schema } from "mongoose";

export interface User {
  id: string;
  discordId: string;
  accessToken: string;
  refreshToken: string;
  name: string;
  email: string;
  avatar: string;
}

export const UserSchema = new Schema<User>({
  discordId: {
    type: String,
    required: true,
    unique: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  
});
