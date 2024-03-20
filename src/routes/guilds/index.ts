import { Router } from "express";
import { isAuthenticated } from "../../utils/middlewares";
import {
  getGuildPermissionsController,
  getGuildsController,
} from "../../controllers/guilds";
import { db } from "../../database";
import cors from "cors";
const router = Router();

router.get("/", isAuthenticated, getGuildsController);

router.get("/:id/permissions", isAuthenticated, getGuildPermissionsController);

var corsOptions = {
  origin: "http:///localhost:3000",
  optionsSuccessStatus: 200,
};

router.post(
  "/:id/updateRob/:RobCooldown/:RobChance/:WorkThef",
  cors(corsOptions),
  isAuthenticated,
  async (req, res) => {
    const guildId = req.params.id;
    const RobCooldown = req.params.RobCooldown;
    const RobChance = parseInt(req.params.RobChance, 10);
    const WorkThef = parseInt(req.params.WorkThef, 10);
    try {
      // Verifique se o guild já existe no banco de dados
      let guild = await db.guilds.findOne({ guildId });

      if (!guild) {
        return res.status(404).json({ message: "Guild not found" });
      }
      // Atualize os dados do guild, mantendo os valores padrão se os novos valores forem vazios
      guild.RobCooldown = RobCooldown !== "0" ? RobCooldown : guild.RobCooldown;
      guild.ChanceToRob = RobChance !== 0 ? RobChance : guild.ChanceToRob;
      guild.PercentageOfTheft =
        WorkThef !== 0 ? WorkThef : guild.PercentageOfTheft;

      // Salve as alterações no banco de dados
      await guild.save();

      // Responda com os dados atualizados do guild
      res.status(200).json({ message: "Guild updated successfully" });
    } catch (error) {
      console.error("Error updating guild:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
