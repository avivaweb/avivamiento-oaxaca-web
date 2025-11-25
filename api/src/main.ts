// api/src/main.ts

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'; // <--- NUEVA IMPORTACIÓN
import { AppModule } from './app.module'; // Asumiendo que existe un app.module

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar la validación global de DTOs
  app.enableCors({
    origin: 'http://localhost:3000', // Permitir que el frontend hable con la API
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Habilitar la validación global de DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remueve propiedades que no están en el DTO
    forbidNonWhitelisted: true, // Lanza error si hay propiedades extra
    transform: true, // Transforma los payloads a sus tipos DTO
  }));

  await app.listen(3003);
  console.log(`Core System API is running on: ${await app.getUrl()}`);
}
bootstrap();