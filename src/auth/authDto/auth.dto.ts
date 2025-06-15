import { IsNotEmpty, IsNumber, isString, IsString } from "class-validator";

export class registerDto{
    @IsString()
    @IsNotEmpty()
    username: string

    @IsNumber()
    @IsNotEmpty()
    age: number

    @IsString()
    @IsNotEmpty()
    password:string

}

export class LoginDto{
    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    password: string

}