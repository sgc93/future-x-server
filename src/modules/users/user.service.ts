import bcrypt from "bcrypt";
import User from "./user.model";

export class UserService {
  async create(data: any) {
    const hashed = await bcrypt.hash(data.password, 10);
    return User.create({ ...data, password: hashed });
  }

  async findAll() {
    return User.findAll();
  }

  async findOne(id: number) {
    return User.findByPk(id);
  }

  async update(id: number, data: any) {
    return User.update(data, { where: { id } });
  }
  async delete(id: number) {
    return User.destroy({ where: { id } });
  }
}
