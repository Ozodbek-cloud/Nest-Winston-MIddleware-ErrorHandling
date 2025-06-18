import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import path from "path"

@Module({
  imports: [SequelizeModule.forFeature([User]),
   ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
    }),
],

  controllers: [UsersController],
  providers: [UsersService]
})

export class UsersModule {}
