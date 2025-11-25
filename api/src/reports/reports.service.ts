import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async create(createReportDto: CreateReportDto) {
    // Lógica para crear un nuevo reporte
    return this.prisma.report.create({
      data: {
        cellId: createReportDto.cellId,
        attendanceCount: createReportDto.attendanceCount,
        newConvertsCount: createReportDto.newConvertsCount,
        prayerRequests: createReportDto.prayerRequests,
      },
    });
  }

  // MÉTODO FALTANTE 1: Obtiene todos los reportes (para administradores)
  async findAll() {
    return this.prisma.report.findMany({
      orderBy: { createdAt: 'desc' }, // Últimos reportes primero
    });
  }

  // MÉTODO FALTANTE 2: Obtiene reportes por ID de célula
  async findReportsByCellId(cellId: string) {
    return this.prisma.report.findMany({
      where: { cellId: cellId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Nota: Los métodos findOne, update y remove no se implementan aquí para mantener el foco en la compilación.
}