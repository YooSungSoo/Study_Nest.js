// server/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS: 프론트 개발 URL 허용
  const defaultOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
  const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
    : defaultOrigins;

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  // 모든 라우트에 /api 프리픽스
  app.setGlobalPrefix('api');

  // DTO 유효성 검사 (불필요 필드 제거 + 타입 변환)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);
  console.log(`✅ Server running at http://localhost:${port}/api`);
}
bootstrap();
