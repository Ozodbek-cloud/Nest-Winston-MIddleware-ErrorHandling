import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto, registerDto } from './authDto/auth.dto';
import { AuthService } from './auth.service';
import { UserBody } from 'src/global/decorators/user.decorators';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post("register")
    register(@UserBody() payload: Required<registerDto>) {
        return this.authService.register_user(payload)
    }

     
    @Post('login')
    loginUser(@Body() payload: Required<LoginDto>) {
        return this.authService.login(payload)
    }

}
