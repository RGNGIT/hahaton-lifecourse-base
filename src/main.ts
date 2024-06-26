import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import * as cors from 'cors'
import { apiPort } from './config';

const corsOpt = {
  origin: true,
  credentials: true,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('LifeCourse')
    .setDescription('Команда СТАС')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cors(corsOpt));
  
  await app.listen(apiPort);
}

bootstrap();