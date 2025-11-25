import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
// Asume que la estrategia jwt.strategy.ts está en este directorio.
// import { JwtStrategy } from './jwt.strategy';
// import { UsersModule } from '../users/users.module'; // Dependencia para validar usuario

@Module({
  imports: [
    // UsersModule, // Se necesita el UsersModule para la validación
    PassportModule,
    // Configuración del JWT: usar un secreto fuerte en producción
    JwtModule.register({
      secret: 'SECRET_DE_AVIVA_MUY_LARGO_Y_FUERTE', // ¡Reemplazar en .env en producción!
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    // JwtStrategy, // Se necesita la estrategia JWT
  ],
  exports: [JwtModule],
})
export class AuthModule {}