import { Query, Resolver } from '@nestjs/graphql';
import { DGS } from '@testing/entities'

@Resolver(() => DGS)
export class DgsResolver {
  @Query(() => DGS)
  constellationsDgs(): DGS {
    return { ok: true }
  }
}
