import { IsArray, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdatePostDto {
  @IsString() @IsOptional() @MinLength(1) title?: string;
  @IsString() @IsOptional() @MinLength(1) content?: string;
  @IsArray()  @IsOptional() tags?: string[];
}
