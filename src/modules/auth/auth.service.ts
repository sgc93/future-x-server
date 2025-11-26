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

    const user = await userService.create(data);
    const token = signAccessToken({ id: user.id, email: user.email });

    return { ok: true, msg: "Registered successfully!", data: { user, token } };
  }

  async login(data: any) {
    const user = await User.scope("withPassword").findOne({
      where: { email: data.email }
    });

    if (!user) {
      return { ok: false, msg: "User Not found", data: null };
    }

    const match = await comparePassword(data.password, user.password);
    if (!match) {
      return { ok: false, msg: "Incorrect credential!", data: null };
    }

    const token = signAccessToken({ id: user.id, email: user.email });
    const { id, email, username, avatar } = user;

    return {
      ok: true,
      msg: "Registered successfully!",
      data: {
        user: { id, email, username, avatar },
        token
      }
    };
  }
}

export const authService = new AuthService();
