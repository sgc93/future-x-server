import jwt, { Secret, SignOptions } from "jsonwebtoken";
import config from "../config/config";

export const signAccessToken = (payload: object): string => {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  });
};

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, config.jwt.secret);
