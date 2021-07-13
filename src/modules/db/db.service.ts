import { Sequelize } from 'sequelize';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DBService {
  constructor(private sequelize: Sequelize) {}

  getConnection() {
    return this.sequelize;
  }
}