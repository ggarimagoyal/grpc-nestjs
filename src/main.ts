import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'checkDivisibility',
      protoPath: join(__dirname, '../proto/check-divisibility.proto'),
    },
  });
  await app.listenAsync();
}
bootstrap();
