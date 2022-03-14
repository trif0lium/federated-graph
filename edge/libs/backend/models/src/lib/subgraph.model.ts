import { AggregateRoot } from "@nestjs/cqrs";

export class Subgraph extends AggregateRoot {
  constructor(public readonly id: string, public readonly name: string) {
    super()
  }
}
