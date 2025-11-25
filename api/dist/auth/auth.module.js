"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const auth_controller_1 = require("./auth.controller");
// Asume que la estrategia jwt.strategy.ts está en este directorio.
// import { JwtStrategy } from './jwt.strategy';
// import { UsersModule } from '../users/users.module'; // Dependencia para validar usuario
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            // UsersModule, // Se necesita el UsersModule para la validación
            passport_1.PassportModule,
            // Configuración del JWT: usar un secreto fuerte en producción
            jwt_1.JwtModule.register({
                secret: 'SECRET_DE_AVIVA_MUY_LARGO_Y_FUERTE', // ¡Reemplazar en .env en producción!
                signOptions: { expiresIn: '60m' },
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
        // JwtStrategy, // Se necesita la estrategia JWT
        ],
        exports: [jwt_1.JwtModule],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map