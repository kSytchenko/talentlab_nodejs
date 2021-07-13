import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from './modules/auth/auth.service';
import { LocalAuthGuard } from './modules/auth/guards/local-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Get()
  async getHello() {
    return 'Hello NestJS';
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
