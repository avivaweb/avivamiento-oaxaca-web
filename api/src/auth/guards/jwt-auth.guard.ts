import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// Usa la estrategia 'jwt' que se configura en el módulo Auth
export class JwtAuthGuard extends AuthGuard('jwt') {}