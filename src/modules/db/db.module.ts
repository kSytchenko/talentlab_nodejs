import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { CONFIG } from '../../config';
import { Role } from './models/role';
import { User } from './models/user';
import { DBService } from './db.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...CONFIG.db,
      models: [
        Role,
        User,
      ],
    }),
  ],
  exports: [
    DBService,
  ],
  providers: [
    DBService,
  ],
})
export class DBModule {}
