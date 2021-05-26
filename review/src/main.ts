import { NestFactory } from '@nestjs/core';

import { ReviewModule } from './Review.module';

async function bootstrap() {
  const app = await NestFactory.create(ReviewModule);
  await app.listen(3001);
}
bootstrap();
