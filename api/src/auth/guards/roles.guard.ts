import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator'; // Asegúrate de que la ruta sea correcta

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    // Lógica real de validación de roles (asumimos que el payload del JWT tiene 'roles')
    const { user } = context.switchToHttp().getRequest();
    // En producción, buscaríamos el usuario para confirmar los roles.
    // Aquí usamos los roles del payload del token.
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}