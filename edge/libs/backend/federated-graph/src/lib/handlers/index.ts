import { SubgraphUpdatedHandler } from './events/subgraph-updated.handler'
import { ComposeFederatedGraphHandler } from './commands/compose-federated-graph.handler'

export const EventHandlers = [SubgraphUpdatedHandler]
export const CommandHandlers = [ComposeFederatedGraphHandler]
