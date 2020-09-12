import { Module } from '@nestjs/common';
import { CheckDivisibilityModule } from './check-divisibility/check-divisibility.module';

@Module({
  imports: [CheckDivisibilityModule],
})
export class AppModule {}