import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: false,
})
export class User extends Model {
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  })
  id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Column
  password: string;
}