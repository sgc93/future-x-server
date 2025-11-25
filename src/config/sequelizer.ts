import { Sequelize } from "sequelize-typescript";
import config from "./config";

export default class Sequelizer {
  sequelizeClient: Sequelize;

  constructor() {
    this.sequelizeClient = new Sequelize({
      host: config.db.host,
      port: config.db.port,
      dialect: "mysql",
      database: config.db.database!,
      username: config.db.username!,
      password: config.db.password!,
    });
  }
}
