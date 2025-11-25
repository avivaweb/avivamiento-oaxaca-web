// api/src/app.module.ts

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ReportsModule } from './reports/reports.module';
import { PrismaService } from './prisma/prisma.service'; // Asegúrate de que PrismaService esté disponible
import { SubscriberModule } from './subscriber/subscriber.module';
// Nota: Otros módulos como ZonesModule, CellsModule, etc., deben ser importados aquí.

@Module({
  imports: [
    AuthModule,
    ReportsModule,
    SubscriberModule,
    // ConfigModule, // Si fuera necesario
    // Importa aquí otros módulos del core system (Zones, Cells, Supervisors)
  ],
  controllers: [],
  providers: [PrismaService], // PrismaService se hace globalmente disponible aquí
})
export class AppModule {}