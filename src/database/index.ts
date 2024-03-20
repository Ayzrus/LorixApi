import mongoose, { InferSchemaType, model } from "mongoose";
import { config } from "dotenv";
import { UserSchema } from "./schemas/User";
import { guildSchema } from "./schemas/guild";
config();

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

export const db = {
  guilds: model("guild", guildSchema, "guilds"),
  users: model("users", UserSchema),
};

export type UserSchema = InferSchemaType<typeof UserSchema>;
export type GuildSchema = InferSchemaType<typeof guildSchema>;
