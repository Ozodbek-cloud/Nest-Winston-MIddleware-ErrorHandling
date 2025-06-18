import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/models/user.model';
import { UserRole } from 'src/global/type/user';
import { Auth, UserBody, UserParam } from 'src/global/decorators/user.decorators';

@Controller()
export class UsersController {
    constructor(private readonly userService: UsersService){}
    
    @Auth(UserRole.ADMIN, UserRole.SUPERADMIN)
    @Put('update/:id')
    Update(@UserBody() payload: Partial<User>, @UserParam("id") id: number) {
      return this.userService.update_user(payload, id)
    }
    
    @Auth(UserRole.ADMIN, UserRole.SUPERADMIN)
    @Delete('users/delete/:id')
    Delete_users(@UserParam("id") id: number) {
        return this.userService.delete_user(id)
    }
    
    @Auth(UserRole.ADMIN, UserRole.SUPERADMIN)
    @Get('all')
    GetAll() {
        return this.userService.get_all()
    }

    @Auth(UserRole.ADMIN, UserRole.SUPERADMIN)
    @Post("add/admin")
    CreateAdmin(payload: Partial<User>) {
        return this.userService.create_admin(payload)
    }

}
