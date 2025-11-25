import { Sequelize } from "sequelize-typescript";
import config from "./config";

const sequelize: Sequelize = new Sequelize({
  host: config.db.host,
  port: config.db.port,
  dialect: "mysql",
  database: config.db.database!,
  username: config.db.username!,
  password: config.db.password!,
  logging: false,
});

export default sequelize;
