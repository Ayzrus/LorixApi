import express, { Express } from "express";
import routes from "../routes";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { config } from "dotenv";
import store = require("connect-mongo");
config();
require("../strategies/discord");

export function createApp(): Express {
  const app = express();

  // Ativa o Cors
  app.use(
    cors()
  );

  // Ativa o Middleware para as requisições
  app.use(express.json());
  app.use(express.urlencoded());

  // Ativa Sessão
  app.use(
    session({
      secret: "YQz#*P$u7#8ZC![tT7n&AZ0XAMS7n6",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000 * 60 * 24 * 1,
      },
      store: store.create({ mongoUrl: process.env.MONGO_URI }),
    })
  );

  // Ativa o Passport
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/api", routes);
  return app;
}
