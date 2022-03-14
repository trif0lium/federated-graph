export class SubgraphVersionAddedEvent {
  constructor(public readonly subgraphId: string, public readonly subgraphVersionId: string) { }
}
