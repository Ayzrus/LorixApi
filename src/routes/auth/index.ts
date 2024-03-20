import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import cors from "cors";

const router = Router();

router.get("/discord", passport.authenticate("discord"), (req, res) => {
  res.sendStatus(200);
});

router.get(
  "/discord/redirect",
  passport.authenticate("discord"),
  (req, res) => {
    const userData = req.user;

    // Gera um token JWT contendo os dados do usuário
    const token = jwt.sign(
      { data: userData },
      "YQz#*P$u7#8ZC![tT7n&AZ0XAMS7n6"
    );

    // Armazena o token JWT no localStorage
    res.cookie("token", token);

    // Redireciona o usuário para a página de dashboard
    res.redirect("http://localhost:3000/Dashboard");
  }
);

var corsOptions = {
  origin: 'http:///localhost:3000',
  optionsSuccessStatus: 200
}

router.post("/logout", cors(corsOptions), (req, res) => {
  res.clearCookie("connect.sid");
  res.clearCookie("token");
  res.sendStatus(200);
});

router.get("/status", (req, res) => {
  return req.user ? res.send(req.user) : res.sendStatus(401).end();
});

export default router;
