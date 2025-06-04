import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './user.service';
import { PostsService } from './post.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true, envFilePath:'.env',})],
  controllers: [AppController],
  providers: [PrismaService, AppService, UsersService, PostsService],
})
export class AppModule {}
