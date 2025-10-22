import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post as PostEntity } from './schemas/post.schema';
import { Comment as CommentEntity } from './schemas/comment.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostEntity.name) private readonly postModel: Model<PostEntity>,
    @InjectModel(CommentEntity.name) private readonly commentModel: Model<CommentEntity>,
  ) {}

  async list(page = 1, pageSize = 9) {
    const skip = (page - 1) * pageSize;
    const [items, total] = await Promise.all([
      this.postModel
        .find({}, null, { sort: { createdAt: -1 }, skip, limit: pageSize })
        .lean(),
      this.postModel.countDocuments(),
    ]);

    const summaries = await Promise.all(items.map(async (p: any) => {
      const commentCount = await this.commentModel.countDocuments({ postId: String(p._id) });
      return {
        id: String(p._id),
        title: p.title,
        excerpt: String(p.content).slice(0, 80),
        author: p.authorName,
        createdAt: p.createdAt,
        commentCount,
        tags: p.tags ?? [],
      };
    }));

    return { items: summaries, total };
  }

  async get(id: string) {
    const p = await this.postModel.findById(id).lean();
    if (!p) throw new NotFoundException('게시글을 찾을 수 없습니다.');
    return {
      id: String(p._id),
      title: p.title,
      content: p.content,
      author: p.authorName,
      createdAt: p.createdAt,
      tags: p.tags ?? [],
    };
  }

  async create(dto: CreatePostDto, authorName: string) {
    const doc = await this.postModel.create({
      title: dto.title,
      content: dto.content,
      tags: dto.tags ?? [],
      authorName,
    });
    return { id: String(doc._id) };
  }

  async update(id: string, dto: UpdatePostDto, authorName: string) {
    const p = await this.postModel.findById(id);
    if (!p) throw new NotFoundException('게시글을 찾을 수 없습니다.');
    if (p.authorName !== authorName) throw new ForbiddenException('작성자만 수정할 수 있습니다.');

    if (dto.title !== undefined) p.title = dto.title;
    if (dto.content !== undefined) p.content = dto.content;
    if (dto.tags !== undefined) p.tags = dto.tags;
    await p.save();

    return {
      id: String(p._id),
      title: p.title,
      content: p.content,
      author: p.authorName,
      createdAt: p.createdAt,
      tags: p.tags ?? [],
    };
  }

  async remove(id: string, authorName: string) {
    const p = await this.postModel.findById(id);
    if (!p) throw new NotFoundException('게시글을 찾을 수 없습니다.');
    if (p.authorName !== authorName) throw new ForbiddenException('작성자만 삭제할 수 있습니다.');

    await this.postModel.deleteOne({ _id: id });
    await this.commentModel.deleteMany({ postId: id }); // 연쇄 삭제
  }

  async listComments(postId: string) {
    const items = await this.commentModel
      .find({ postId }, null, { sort: { createdAt: 1 } })
      .lean();

    return items.map((c: any) => ({
      id: String(c._id),
      author: c.authorName,
      content: c.content,
      createdAt: c.createdAt,
    }));
  }

  async createComment(postId: string, dto: { content: string }, authorName: string) {
    // 존재 여부 체크 (선택)
    const exists = await this.postModel.exists({ _id: postId });
    if (!exists) throw new NotFoundException('게시글을 찾을 수 없습니다.');

    const c = await this.commentModel.create({
      postId,
      authorName,
      content: dto.content,
    });

    return {
      id: String(c._id),
      author: c.authorName,
      content: c.content,
      createdAt: c.createdAt,
    };
  }

  async removeComment(postId: string, commentId: string, authorName: string) {
    const c = await this.commentModel.findOne({ _id: commentId, postId });
    if (!c) throw new NotFoundException('댓글을 찾을 수 없습니다.');
    if (c.authorName !== authorName) throw new ForbiddenException('작성자만 삭제할 수 있습니다.');
    await this.commentModel.deleteOne({ _id: commentId });
  }
}
