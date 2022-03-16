import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
@Directive('@key(fields: "name")')
export class Character {
  @Field((type) => ID)
  name: string

  @Field()
  vision: string

  @Field()
  weapon: string

  @Field()
  affiliation: string

  @Field((type) => Int)
  rarity: number

  @Field()
  constellation: string
}
