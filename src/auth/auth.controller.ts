import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../user/user.service';
import { LocalAuthGuard } from './local-auth.guard';
import { User as UserModel } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('/sign-up')
  async signupUser(
    @Body() userData: { name?: string; email: string; password: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}
