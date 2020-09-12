import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from '../grpc-client-options';
import { CheckDivisibilityController } from './check-divisibility.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CHECK_DIVISIBILITY_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
  ],
  controllers: [CheckDivisibilityController],
})
export class CheckDivisibilityModule {}