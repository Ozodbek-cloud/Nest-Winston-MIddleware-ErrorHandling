import { DataTypes } from "sequelize";
import { Table, Column, Model } from "sequelize-typescript";

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

   @Column({
    type: DataTypes.STRING
   })
   password: string
}