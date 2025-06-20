import {
  Controller,
  Param,
  Get,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostModel } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-aut.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Get('feed')
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { published: true },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/filtered-posts')
  async getFilteredPosts(
    @Query('searchString') searchString: string,
  ): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<PostModel | null> {
    return this.postService.post({ id: Number(id) });
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createDraft(
    @Body() postData: { title: string; content?: string; authorEmail: string },
  ): Promise<PostModel> {
    const { title, content, authorEmail } = postData;
    return this.postService.createPost({
      title,
      content,
      User: {
        connect: { email: authorEmail },
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put('publish/:id')
  async publishPost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.updatePost({
      where: { id: Number(id) },
      data: { published: true },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: Number(id) });
  }
}
