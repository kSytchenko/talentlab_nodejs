import { applyDecorators, UseGuards } from '@nestjs/common';

import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role';
import { JwtAuthGuard } from '../modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from './roles.guard';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    Roles(roles),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
}