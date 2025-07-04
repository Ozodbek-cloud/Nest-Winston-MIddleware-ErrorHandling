import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: 'MdH3C!@#', 
      signOptions: { expiresIn: '1h' },
    })
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
