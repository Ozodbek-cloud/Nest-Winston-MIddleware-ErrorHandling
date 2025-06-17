import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto, registerDto } from './authDto/auth.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post("register")
    register(@Body() payload: Required<registerDto>) {
        return this.authService.register_user(payload)
    }

     
    @Post('login')
    loginUser(@Body() payload: Required<LoginDto>) {
        return this.authService.login(payload)
    }

}
