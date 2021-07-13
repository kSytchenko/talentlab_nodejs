import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DBModule } from '../db/db.module';

@Module({
  controllers: [UserController],
  imports: [DBModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
