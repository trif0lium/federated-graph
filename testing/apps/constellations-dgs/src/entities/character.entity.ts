import { Directive, Field, ID, ObjectType } from '@nestjs/graphql'
import { Constellation } from './constellation.entity'

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "name")')
export class Character {
  @Field((type) => ID)
  @Directive('@external')
  name: string

  @Field((type) => [Constellation])
  constellations: Constellation[]
}
