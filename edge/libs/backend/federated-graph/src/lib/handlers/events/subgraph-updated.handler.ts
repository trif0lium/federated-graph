import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { SubgraphUpdatedEvent } from '@edge/backend/events'

@EventsHandler(SubgraphUpdatedEvent)
export class SubgraphUpdatedHandler implements IEventHandler<SubgraphUpdatedEvent> {
  handle(event: SubgraphUpdatedEvent) {
    console.log(event)
    return
  }
}
