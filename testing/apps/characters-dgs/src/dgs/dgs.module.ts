import { Module } from '@nestjs/common';
import { DgsResolver } from './dgs.resolver';

@Module({
  providers: [DgsResolver],
})
export class DgsModule {}
