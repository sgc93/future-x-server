import {
  Column,
  DataType,
  Model,
  Table
} from "sequelize-typescript";

@Table({
  tableName: "videos",
  timestamps: true
})
export default class Video extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  description!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  category!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  duration!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  youtube_id!: string;

}
