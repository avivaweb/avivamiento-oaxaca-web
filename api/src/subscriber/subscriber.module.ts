import { Module } from '@nestjs/common';
import { SubscriberService } from './subscriber.service';
import { SubscriberController } from './subscriber.controller';
import { PrismaModule } from '../prisma/prisma.module'; // <--- IMPORTACIÓN CLAVE

@Module({
  imports: [PrismaModule], // <--- AGREGAR AQUÍ
  controllers: [SubscriberController],
  providers: [SubscriberService],
})
export class SubscriberModule {}
