import axios from "axios";
import { DISCORD_API_URL } from "../../utils/constants";
import { config } from "dotenv";
import { PartialGuild } from "../../utils/types";
import { db } from "../../database";
config();

export function getBotGuildsService() {
  return axios.get<PartialGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
    headers: { Authorization: `Bot ${process.env.BOT_TOKEN}` },
  });
}

export async function getUserGuildsService(id: string) {
  const user = await db.users.findById(id);
  if (!user) throw new Error("Utilizador não encontrado");
  return axios.get<PartialGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
    headers: { Authorization: `Bearer ${user.accessToken}` },
  });
}

export async function getMutualGuildsService(id: string) {
  const { data: botGuilds } = await getBotGuildsService();
  const { data: userGuilds } = await getUserGuildsService(id);

  const adminUserGuilds = userGuilds.filter(
    ({ permissions }) => (parseInt(permissions) & 0x8) === 0x8
  );
  return adminUserGuilds.filter((guild) =>
    botGuilds.some((botGuild) => botGuild.id === guild.id)
  );
}
