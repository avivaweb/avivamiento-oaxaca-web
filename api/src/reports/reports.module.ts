// api/src/reports/reports.module.ts

import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { PrismaService } from '../prisma/prisma.service'; // Asegúrate de importar Prisma

@Module({
  imports: [
    // Aquí podrías importar otros módulos como AuthModule si necesitaras inyectar servicios de allí.
  ],
  controllers: [ReportsController],
  providers: [
    ReportsService,
    PrismaService // Proporcionamos el servicio Prisma localmente (o globalmente en AppModule)
  ],
  exports: [
    ReportsService // Exportamos el servicio si otros módulos necesitan usarlo
  ]
})
export class ReportsModule {}