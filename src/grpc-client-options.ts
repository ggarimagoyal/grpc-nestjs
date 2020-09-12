import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'checkDivisibility',
    protoPath: join(__dirname, '../proto/check-divisibility.proto'),
  },
};