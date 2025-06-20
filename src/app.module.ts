import { Module } from '@nestjs/common';
import { UsersService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtService } from '@nestjs/jwt';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    AuthModule,
    UserModule,
    PostModule,
  ],
})
export class AppModule {}
