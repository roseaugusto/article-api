import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UsersService } from 'src/user/user.service';
import { UserController } from './user.controller';

@Module({
  providers: [UsersService, PrismaService],
  exports: [UsersService],
  controllers: [UserController],
})
export class UserModule {}
