import { AggregateRoot } from "@nestjs/cqrs";

export class Subgraph extends AggregateRoot {
  public readonly creationDate: Date
  public readonly modificationDate: Date

  constructor(public readonly id: string, public readonly name: string, public readonly routingUrl: string) {
    super()
  }
}
