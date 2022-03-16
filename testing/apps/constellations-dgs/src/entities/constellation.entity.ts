import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Constellation {
  @Field()
  name: string

  @Field()
  unlock: string

  @Field()
  description: string

  @Field((type) => Int)
  level: number
}
