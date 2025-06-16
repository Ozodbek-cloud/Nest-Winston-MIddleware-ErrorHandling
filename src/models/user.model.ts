import { Matches } from "class-validator";
import { DataTypes } from "sequelize";
import { Table, Column, Model } from "sequelize-typescript";
import { UserRole } from "src/global/type/user";

@Table

export class User extends Model{
   @Column({
    type: DataTypes.STRING, 
    unique: true
   })
   username: string

   @Column({
    type: DataTypes.INTEGER
   })
   age: number

   @Column
   @Matches(/^[a-z]+$/, {message: "SHunqa emas"})
   password: string

   @Column({
      type: DataTypes.ENUM(...Object.values(UserRole)),
      defaultValue: UserRole.SUPERADMIN
   })
   role: UserRole

}