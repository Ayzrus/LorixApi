import { Request, Response } from "express";
import { getMutualGuildsService } from "../../services/guilds";
import { User } from "../../database/schemas/User";

export async function getGuildsController(req: Request, res: Response) {
  const user = req.user as User;
  try {
    const guilds = await getMutualGuildsService(user.id);
    res.send(guilds);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

export async function getGuildPermissionsController(
  req: Request,
  res: Response
) {
  const user = req.user as User;
  const { id } = req.params; 
  try {
    const guilds = await getMutualGuildsService(user.id);
    const valid = guilds.some((guild) => guild.id === id)
    return valid ? res.sendStatus(200) : res.sendStatus(403)
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}
