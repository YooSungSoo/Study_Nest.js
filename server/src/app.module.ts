// server/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// 앞으로 만들 모듈들(예: PostsModule, AuthModule)을 여기 imports에 추가하면 됩니다.
// import { PostsModule } from './posts/posts.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // .env 로딩 (전역)
    ConfigModule.forRoot({ isGlobal: true }),

    // MongoDB 연결
    MongooseModule.forRootAsync({
      useFactory: (cfg: ConfigService) => {
        const uri = cfg.get<string>('MONGODB_URI') ?? 'mongodb://127.0.0.1:27017/jungle_project';
        return { uri };
      },
      inject: [ConfigService],
    }),

    // PostsModule, AuthModule 등 도메인 모듈은 여기 추가
    PostsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
