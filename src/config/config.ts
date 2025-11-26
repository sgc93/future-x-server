import dotenv from "dotenv";

dotenv.config();

const config = {
  db: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: String(process.env.DB_USERNAME),
    password: String(process.env.DB_PASSWORD),
    database: String(process.env.DB_DATABASE)
  },

  jwt: {
    secret: String(process.env.JWT_SECRET || "supersecret"),
    expiresIn: Number(process.env.JWT_EXPIRES_IN || "1") * 60 * 60 * 24
  },

  cors: {
    origin: process.env.CORS_ORIGIN || "*"
  }
};

export default config;
