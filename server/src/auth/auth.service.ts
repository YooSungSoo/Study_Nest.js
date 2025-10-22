import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwt: JwtService,
  ) {}

  async signUp(dto: SignUpDto) {
    const email = dto.email.trim().toLowerCase();
    const nickname = dto.nickname.trim();

    const already = await this.userModel.exists({ email });
    if (already) {
      throw new BadRequestException('이미 가입된 이메일입니다.');
    }

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.userModel.create({
      email,
      password: hashed,
      nickname,
    });

    return this.buildAuthPayload(user);
  }

  async signIn(dto: SignInDto) {
    const email = dto.email.trim().toLowerCase();
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 일치하지 않습니다.');
    }

    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 일치하지 않습니다.');
    }

    return this.buildAuthPayload(user);
  }

  private buildAuthPayload(user: UserDocument) {
    const payload = { sub: String(user._id), email: user.email };
    const token = this.jwt.sign(payload);

    return {
      user: {
        name: user.nickname,
        email: user.email,
      },
      token,
    };
  }
}
