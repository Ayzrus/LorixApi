import { Strategy } from "passport-discord";
import passport, { Profile } from "passport";
import { VerifyCallback } from "passport-oauth2";
import { db } from "../database";

passport.serializeUser((user: any, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await db.users.findById(id);
    return user ? done(null, user) : done(null, null);
  } catch (error) {
    console.log(error);
    return done(error, null);
  }
});

passport.use(
  new Strategy(
    {
      clientID: process.env.DISCORD_CLIENT_Id as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      callbackURL: process.env.DISCORD_CALLBACK_URL,
      scope: ["identify", "email", "guilds"],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile,
      done: VerifyCallback
    ) => {
      try {
        const { id: discordId } = profile;
        const name = profile.global_name
        const email = profile.email
        const avatar = profile.avatar ?? "https://voxnews.com.br/wp-content/uploads/2017/04/unnamed.png"
        const existUser = await db.users.findOneAndUpdate(
          { discordId },
          { accessToken, refreshToken, name, email, avatar },
          { new: true }
        );
        if (existUser) return done(null, existUser);

        const newUser = new db.users({ discordId, accessToken, refreshToken, name, email, avatar });

        const savedUser = await newUser.save();
        return done(null, savedUser);
      } catch (error) {
        console.log(error);
        return done(error as any, undefined);
      }
    }
  )
);
