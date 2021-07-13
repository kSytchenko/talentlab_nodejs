import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DBModule } from './modules/db/db.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { GeneralExceptionFilter } from './filters/exception.filter';

@Module({
  imports: [
    AuthModule,
    UserModule,
    DBModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GeneralExceptionFilter,
    },
  ]
})
export class AppModule {}
