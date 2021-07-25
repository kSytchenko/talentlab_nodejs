import { Controller, Get, Post, UseGuards, Request, Body, Delete, Param } from '@nestjs/common';

import { Role } from '../../enums/role';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { Auth } from '../auth/guards/auth.guard';
import { UserData } from './interfaces';
import { GeneralException } from '../../exceptions/general.exception';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Request() req) {
    return this.userService.findById(req.user.id);
  }

  @Auth(Role.Admin)
  @Get('admin')
  async admin() {
    return 'You\'re logged in as Admin';
  }

  @Auth(Role.User)
  @Get('user')
  async user() {
    return 'You\'re logged in as User';
  }

  @Auth(Role.Admin)
  @Post('users')
  async createUser(@Body() userData: UserData) {
    if (!userData.username || !userData.password) {
      throw new GeneralException('All or one of the required parameters is missing.', 400);
    }

    return this.userService.create(userData.username, userData.password, JSON.parse(userData.roles));
  }

  @Auth(Role.Admin)
  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    if (!id) {
      throw new GeneralException('"id" parameter cannot be empty', 400);
    }
    return this.userService.delete(id);
  }
}