import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Comment {
  _id: string;

  @Prop({ required: true }) postId: string;
  @Prop({ required: true }) authorName: string;
  @Prop({ required: true }) content: string;

  // ✅ 타임스탬프
  createdAt: Date;
  updatedAt: Date;
}

export type WithTimestamps = { createdAt: Date; updatedAt: Date };

export type CommentDocument = HydratedDocument<Comment & WithTimestamps>;

export const CommentSchema = SchemaFactory.createForClass(Comment);
