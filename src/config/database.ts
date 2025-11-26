import { Sequelize } from "sequelize-typescript";
import config from "./config";
import User from "../modules/users/user.model";

const sequelize: Sequelize = new Sequelize({
  host: config.db.host,
  port: config.db.port,
  dialect: "mysql",
  database: config.db.database!,
  username: config.db.username!,
  password: config.db.password!,
  logging: false,
  models: [User]
});

export default sequelize;
