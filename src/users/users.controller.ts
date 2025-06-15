import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/models/user.model';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Put('update/:id')
    Update(@Body() payload: Partial<User>, @Param() id: number) {
      return this.userService.update_user(payload, id)
    }

    @Delete('users/delete/:id')
    Delete_users(@Param() id: number) {
        return this.userService.delete_user(id)
    }
    
    @Get('users/all')
    GetAll() {
        return this.userService.get_all()
    }

}
