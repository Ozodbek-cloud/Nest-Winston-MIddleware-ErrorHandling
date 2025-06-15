import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { User } from './models/user.model';
import { UsersModule } from './users/users.module';



@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: "localhost",
      username: "postgres",
      port:5432,
      password: "12345",
      database: "dars8",
      autoLoadModels: true,
      synchronize: true,
      models: [User]
    }),
    AuthModule,
    UsersModule
  ]
})
export class AppModule {}
