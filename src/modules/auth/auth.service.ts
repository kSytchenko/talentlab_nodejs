import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { User } from '../db/models/user';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<User> {
    return this.userService.findOne(username, password);
  }

  async login(user: User) {
    const payload = { username: user.username, userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}