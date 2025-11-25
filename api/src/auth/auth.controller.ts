import { Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  @Post('test-token')
  async getTestToken() {
    const payload = {
      email: 'pastor.principal@aviva.com',
      sub: 'test-user-id-001',
      roles: ['Pastor Principal', 'Pastor de Zona', 'Supervisor', 'Lider de Celula']
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: payload.sub,
        email: payload.email,
        roles: payload.roles,
        name: 'Pastor Principal (Test)',
      },
      message: 'Token de prueba generado con todos los roles. Usar solo en desarrollo/staging.',
    };
  }
}