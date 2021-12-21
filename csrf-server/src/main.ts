import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';

async function bootstrap() {
  // ...
  // somewhere in your initialization file
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(csurf({ cookie: { httpOnly: true } }));
  await app.listen(3000);
}
bootstrap();
