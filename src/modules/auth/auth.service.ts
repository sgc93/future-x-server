import config from "../../config/config";
import { comparePassword } from "../../utils/hash";
import { signAccessToken } from "../../utils/jwt";
import User from "../users/user.model";
import { userService } from "../users/user.service";

class AuthService {
  async register(data: any) {
    const existing = await User.findOne({ where: { email: data.email } });
    if (existing) {
      return { ok: false, msg: "Email already exists", data: null };
    }

    const user = await userService.create({ ...data, role: "user" });
    const token = signAccessToken({
      id: user.id,
      email: user.email,
      role: user.role
    });

    return {
      ok: true,
      msg: "Registered successfully!",
      data: { user, token, expiresIn: config.jwt.expiresIn * 60 * 60 * 24 }
    };
  }

  async login(data: any) {
    const user = await User.scope("withPassword").findOne({
      where: { email: data.email }
    });

    if (!user) {
      return {
        ok: false,
        msg: "User not registed, Sign up instead!",
        data: null
      };
    }

    const match = await comparePassword(data.password, user.password);
    if (!match) {
      return { ok: false, msg: "Incorrect credential!", data: null };
    }

    const token = signAccessToken({
      id: user.id,
      email: user.email,
      role: user.role
    });
    const { id, email, username, avatar } = user;

    return {
      ok: true,
      msg: "Registered successfully!",
      data: {
        user: { id, email, username, avatar, role: user.role },
        token,
        expiresIn: config.jwt.expiresIn * 60 * 60 * 24
      }
    };
  }

  async me(email: string) {
    const existing = await User.findOne({ where: { email } });
    if (!existing) {
      return { ok: false, msg: "Unauthorized", data: null };
    }

    return {
      ok: true,
      msg: "Data fetched successfully!",
      data: existing
    };
  }
}

export const authService = new AuthService();
