import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UsersService } from 'src/user/user.service';

@Module({
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UserModule {}
