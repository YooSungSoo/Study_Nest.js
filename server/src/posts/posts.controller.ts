import {
  Controller, Get, Post as HttpPost, Patch, Delete,
  Param, Query, Body, Req, HttpCode
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly posts: PostsService) {}

  @Get()
  list(@Query('page') page?: string, @Query('pageSize') pageSize?: string) {
    return this.posts.list(Number(page || 1), Number(pageSize || 9));
  }

  @HttpPost()
  create(@Body() dto: CreatePostDto, @Req() req: any) {
    const authorName = req.headers['x-user-name'] || 'Soo'; // 임시
    return this.posts.create(dto, authorName);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.posts.get(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePostDto, @Req() req: any) {
    const authorName = req.headers['x-user-name'] || 'Soo';
    return this.posts.update(id, dto, authorName);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string, @Req() req: any) {
    const authorName = req.headers['x-user-name'] || 'Soo';
    return this.posts.remove(id, authorName);
  }

  @Get(':id/comments')
  listComments(@Param('id') postId: string) {
    return this.posts.listComments(postId);
  }

  @HttpPost(':id/comments')
  createComment(@Param('id') postId: string, @Body() dto: CreateCommentDto, @Req() req: any) {
    const authorName = req.headers['x-user-name'] || 'Soo';
    return this.posts.createComment(postId, dto, authorName);
  }

  @Delete(':id/comments/:commentId')
  @HttpCode(204)
  removeComment(
    @Param('id') postId: string,
    @Param('commentId') commentId: string,
    @Req() req: any,
  ) {
    const authorName = req.headers['x-user-name'] || 'Soo';
    return this.posts.removeComment(postId, commentId, authorName);
  }
}
