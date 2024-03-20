import { config } from "dotenv";
import { createApp } from "./utils/createApp";
import "./database";
import cors from "cors";
config();

const PORT = process.env.PORT || 3001;

async function main() {
  try {
    const app = createApp();

    app.listen(PORT, () => console.log(`Running on port ${PORT}`));
    console.log(`Running in Dev mode.`);
  } catch (error) {
    console.log(error);
  }
}

main();
