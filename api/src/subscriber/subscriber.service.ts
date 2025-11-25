import { Injectable, InternalServerErrorException, ConflictException } from '@nestjs/common'; // <-- NUEVA IMPORTACIÓN
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { Prisma } from '@prisma/client'; // <-- IMPORTACIÓN CLAVE

@Injectable()
export class SubscriberService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSubscriberDto) {
    const subscriberData: { email: string; whatsapp?: string } = {
      email: data.email,
    };

    if (data.whatsapp) {
      subscriberData.whatsapp = data.whatsapp;
    }

    try {
      return this.prisma.subscriber.create({
        data: subscriberData,
      });
    } catch (error) {
      // CLAVE: Manejar el error de UNIQUE (P2002) de Prisma
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Este email ya está registrado como suscriptor.');
      }
      
      // Error genérico de base de datos o interno
      console.error("Prisma Subscriber Creation Error:", (error as Error).message);
      throw new InternalServerErrorException('Error al guardar el suscriptor: verifique la consola del servidor.');
    }
  }
}
