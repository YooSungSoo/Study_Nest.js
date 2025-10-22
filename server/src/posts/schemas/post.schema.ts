import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Post {
  _id: string;

  @Prop({ required: true }) title: string;
  @Prop({ required: true }) content: string;
  @Prop({ required: true }) authorName: string;
  @Prop({ type: [String], default: [] }) tags: string[];

  // ✅ TS에게 타임스탬프가 있다고 알려주기
  createdAt: Date;
  updatedAt: Date;
}

export type WithTimestamps = { createdAt: Date; updatedAt: Date };

// Hydrated 문서 타입에도 타임스탬프 포함
export type PostDocument = HydratedDocument<Post & WithTimestamps>;

export const PostSchema = SchemaFactory.createForClass(Post);
