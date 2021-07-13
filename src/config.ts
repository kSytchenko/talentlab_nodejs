import { SequelizeModuleOptions } from '@nestjs/sequelize/dist/interfaces/sequelize-options.interface';

export const CONFIG: { db: SequelizeModuleOptions } = {
  db: {
    dialect: 'postgres',
    host: process.env.LOCAL ? '127.0.0.1' : 'postgres',
    port: 5432,
    username: process.env.DB_U || 'talentlab',
    password: process.env.DB_P || 'talentlab',
    database: process.env.DB_NAME || 'talentlab',
  }
};