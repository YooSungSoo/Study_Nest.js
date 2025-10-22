import { IsArray, IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString() @MinLength(1) title: string;
  @IsString() @MinLength(1) content: string;
  @IsArray() @IsOptional() tags?: string[];
}
