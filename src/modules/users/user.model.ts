import {
  AfterCreate,
  AllowNull,
  BeforeCreate,
  Column,
  DataType,
  DefaultScope,
  Model,
  Scopes,
  Table
} from "sequelize-typescript";
import { hashPassword } from "../../utils/hash";

@DefaultScope(() => ({ attributes: { exclude: ["password"] } }))
@Scopes(() => ({ withPassword: { attributes: { include: ["password"] } } }))
@Table({
  tableName: "users",
  timestamps: true
})
export default class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password!: string;

  @Column({
    type: DataType.ENUM("admin", "user"),
    allowNull: false,
    defaultValue: "user"
  })
  role!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  avatar?: string;

  @BeforeCreate
  static async hashPass(user: User) {
    user.password = await hashPassword(user.password);
  }
}
