import {
  AllowNull,
  Column,
  DataType,
  Model,
  Table
} from "sequelize-typescript";

@Table({
  tableName: "users",
  timestamps: true
})
export default class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;

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
    type: DataType.STRING,
    allowNull: true
  })
  avatar?: string;
}
