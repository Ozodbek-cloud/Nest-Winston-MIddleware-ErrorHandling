import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  let port = 3000
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); 
  await app.listen(process.env.PORT ?? port, () => {
    console.log(`Server is running on ${port}`)
  });
}

bootstrap();
