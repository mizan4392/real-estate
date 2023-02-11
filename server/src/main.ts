import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from './util/environment';
import { connect } from './util/redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  connect(environment.redis);
  await app.listen(4000, () => {
    Logger.log('server is runing on port 4000');
  });
}
bootstrap();
