import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { User } from './models/user.model';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './global/middleware/logger.middleware';



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
    AuthModule, UsersModule
  ]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('api/users')
  }
}
