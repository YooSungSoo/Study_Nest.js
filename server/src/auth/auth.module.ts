import { Module } from '@nestjs/common';
import { JwtModule, type JwtModuleOptions, type JwtSignOptions } from '@nestjs/jwt';
import type { StringValue } from 'ms';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      useFactory: (cfg: ConfigService): JwtModuleOptions => {
        const secret = cfg.get<string>('JWT_SECRET') || 'dev-secret-change-me';
        const expiresIn = (cfg.get<string>('JWT_EXPIRES_IN') ?? '7d') as StringValue | number;
        const signOptions: JwtSignOptions = {
          expiresIn,
        };
        return {
          secret,
          signOptions,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
