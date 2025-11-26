import User from "./user.model";

class UserService {
  async create(data: any) {
    const user = await User.create(data);
    const { id, username, email, avatar, createdAt, updatedAt } = user;

    return { id, username, email, avatar, createdAt, updatedAt };
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

export const userService = new UserService();
