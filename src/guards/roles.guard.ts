import { QueryTypes } from 'sequelize';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/role';
import { DBService } from '../modules/db/db.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private dbService: DBService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const queryResult = await this.dbService.getConnection().query(
      'SELECT role_id FROM user_to_role WHERE user_id = :userId',
      {
        replacements: { userId: user.id },
        type: QueryTypes.SELECT,
      },
    );

    const userRoles = queryResult.map(userRole => userRole['role_id']);
    return roles.every(role => userRoles.includes(role));
  }
}