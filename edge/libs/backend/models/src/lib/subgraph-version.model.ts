import { AggregateRoot } from "@nestjs/cqrs";

export class SubgraphVersion extends AggregateRoot {
  public readonly creationDate: Date
  public readonly modificationDate: Date

  constructor(public readonly id: string, public readonly subgraphId: string, public readonly data: string) {
    super()
  }
}
