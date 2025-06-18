import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/models/user.model';
import { UserRole } from 'src/global/type/user';
import { Auth, UserBody, UserParam } from 'src/global/decorators/user.decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { registerDto } from 'src/auth/authDto/auth.dto';

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
     
    @Post('uploads')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: "./uploads",
            filename:(req, file, cb) => {
                let filename =uuidv4()
                cb(null, filename + extname(file.originalname))
            }
        })
    }))

    uploadsImg(@UploadedFile() file: Express.Multer.File, @Body() payload: any) {
        return this.userService.uploadsImg({...payload, filename: file.filename})
    }

}
