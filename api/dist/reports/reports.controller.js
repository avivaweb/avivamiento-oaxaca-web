"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const reports_service_1 = require("./reports.service");
const create_report_dto_1 = require("./dto/create-report.dto");
const roles_decorator_1 = require("../auth/decorators/roles.decorator"); // Ruta a tu decorador de Roles
const roles_guard_1 = require("../auth/guards/roles.guard"); // Ruta a tu Guardia
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard"); // Ruta a tu Guardia JWT
let ReportsController = class ReportsController {
    constructor(reportsService) {
        this.reportsService = reportsService;
    }
    // POST /reports - CREAR REPORTE (ACCESO RESTRINGIDO)
    // Solo Líder de Célula o Supervisor puede crear
    create(createReportDto) {
        return this.reportsService.create(createReportDto);
    }
    // GET /reports/cell/:cellId - LISTAR POR CÉLULA
    // Solo Supervisores y roles superiores pueden consultar los reportes de una célula
    findReportsByCellId(cellId) {
        return this.reportsService.findReportsByCellId(cellId);
    }
    // GET /reports - LISTAR TODOS
    // Solo Pastor Principal (acceso ejecutivo) puede ver todos los reportes
    findAll() {
        return this.reportsService.findAll();
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('Lider de Celula', 'Supervisor'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_report_dto_1.CreateReportDto]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('cell/:cellId'),
    (0, roles_decorator_1.Roles)('Pastor Principal', 'Supervisor'),
    __param(0, (0, common_1.Param)('cellId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "findReportsByCellId", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('Pastor Principal'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "findAll", null);
exports.ReportsController = ReportsController = __decorate([
    (0, common_1.Controller)('reports'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard) // Protege todas las rutas por defecto
    ,
    __metadata("design:paramtypes", [reports_service_1.ReportsService])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map