import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers, EventHandlers } from './handlers';

@Module({
  imports: [CqrsModule],
  controllers: [],
  providers: [
    ...CommandHandlers,
    ...EventHandlers
  ],
  exports: [],
})
export class FederatedGraphModule { }
