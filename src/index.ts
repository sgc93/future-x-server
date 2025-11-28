import "reflect-metadata";
import dotenv from "dotenv";
import { createApp } from "./app";
import sequelize from "./config/database";

dotenv.config();

const app = createApp();
const port = Number(process.env.PORT) || 5000;

const init = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Successfully connected to MySQL database");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect with MySQL database");
    console.error(error);
    process.exit(1);
  }
};

init();
