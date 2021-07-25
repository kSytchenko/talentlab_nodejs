import { Injectable } from '@nestjs/common';
import { QueryTypes, UniqueConstraintError } from 'sequelize';

import { User } from '../db/models/user';
import { DBService } from '../db/db.service';
import { Role } from '../../enums/role';
import { GeneralException } from '../../exceptions/general.exception';

@Injectable()
export class UserService {

  constructor(private dbService: DBService) {
  }

  async findById(id: number) {
    return User.findByPk(id);
  }

  async findOne(username: string, password: string) {
    return User.findOne({ where: { username, password } });
  }

  async create(username: string, password: string, roles: Role[] = [Role.User]) {
    try {
      const user = await User.create({ username, password });

      await Promise.all(
        roles.map(role => {
          return this.dbService.getConnection().query(
            'INSERT INTO user_to_role (user_id, role_id) VALUES (:userId, :roleId)',
            {
              replacements: { userId: user.id, roleId: role },
              type: QueryTypes.INSERT,
            }
          )
        })
      );

      return user;
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new GeneralException('Username already exists', 400);
      }
      throw new GeneralException('Something went wrong', 500);
    }
  }

  async getUserRoles(userId: string) {
    return this.dbService.getConnection().query(
      'SELECT role_id FROM user_to_role WHERE user_id = :userId',
      {
        replacements: { userId },
        type: QueryTypes.SELECT,
      },
    );
  }
}