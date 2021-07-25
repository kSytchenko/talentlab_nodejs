import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/role';
import { UserService } from '../modules/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const queryResult = await this.userService.getUserRoles(user.id);
    const userRoles = queryResult.map(userRole => userRole['role_id']);
    return roles.every(role => userRoles.includes(role));
  }
}