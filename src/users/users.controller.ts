import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/models/user.model';
import { Roles } from 'src/global/decorators/roles.decorator';
import { UserRole } from 'src/global/type/user';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { RolesGuard } from 'src/global/guards/roles.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}
    

    @Put('update/:id')
    Update(@Body() payload: Partial<User>, @Param("id") id: number) {
      return this.userService.update_user(payload, id)
    }
    
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @Roles()
    @Delete('users/delete/:id')
    Delete_users(@Param("id") id: number) {
        return this.userService.delete_user(id)
    }
    
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @Get('users/all')
    GetAll() {
        return this.userService.get_all()
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.SUPERADMIN)
    @Post("add/admin")
    CreateAdmin(payload: Partial<User>) {
        return this.userService.create_admin(payload)
    }

}
