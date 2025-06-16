import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { LoginDto, registerDto } from './authDto/auth.dto';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(@InjectModel(User) private userModel: typeof User, private jwtService: JwtService) { }

    async register_user(payload: Required<registerDto>) {
        let user = await this.userModel.findOne({
            where: {
                username: payload.username
            }
        })
        if (user) throw new ConflictException(`This ${payload.username} Is Already Exists`)

        let hash = await bcrypt.hash(payload.password, 10)

        let data = await this.userModel.create({ ...payload, password: hash })
        let accessToken = await this.jwtService.signAsync({ userId: data.dataValues.id })

        return { accessToken }

    }

    async login(payload: Required<LoginDto>) {
        let exists = await this.userModel.findOne({
            where: { username: payload.username }
        });

        if (!exists) throw new NotFoundException(`${payload.username} is not Found`);

        let compare = await bcrypt.compare(payload.password, exists.dataValues.password);
        if (!compare) throw new NotFoundException(`${payload.password} is not Equal to your last password`);
        let accessToken = await this.jwtService.signAsync({ userId: exists.dataValues.id })

        return {
            accessToken
        };
    }

}
