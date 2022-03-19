import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class DGS {
  @Field(() => Boolean)
  ok: boolean
}
