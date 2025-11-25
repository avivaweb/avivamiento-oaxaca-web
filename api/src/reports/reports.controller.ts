import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { Roles } from '../auth/decorators/roles.decorator'; // Ruta a tu decorador de Roles
import { RolesGuard } from '../auth/guards/roles.guard'; // Ruta a tu Guardia
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Ruta a tu Guardia JWT

@Controller('reports')
@UseGuards(JwtAuthGuard, RolesGuard) // Protege todas las rutas por defecto
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  // POST /reports - CREAR REPORTE (ACCESO RESTRINGIDO)
  // Solo Líder de Célula o Supervisor puede crear
  @Post()
  @Roles('Lider de Celula', 'Supervisor')
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.create(createReportDto);
  }

  // GET /reports/cell/:cellId - LISTAR POR CÉLULA
  // Solo Supervisores y roles superiores pueden consultar los reportes de una célula
  @Get('cell/:cellId')
  @Roles('Pastor Principal', 'Supervisor')
  findReportsByCellId(@Param('cellId') cellId: string) {
    return this.reportsService.findReportsByCellId(cellId);
  }

  // GET /reports - LISTAR TODOS
  // Solo Pastor Principal (acceso ejecutivo) puede ver todos los reportes
  @Get()
  @Roles('Pastor Principal')
  findAll() {
    return this.reportsService.findAll();
  }
}
