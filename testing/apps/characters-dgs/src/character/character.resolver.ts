import { Args, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { Character } from '../entities/character.entity';
import { CharacterService } from './character.service';

@Resolver(() => Character)
export class CharacterResolver {
  constructor(private readonly service: CharacterService) { }

  @Query(() => [String])
  async characters(): Promise<string[]> {
    return this.service.characters()
  }

  @Query(() => Character)
  async character(@Args('name') name: string): Promise<Character> {
    return this.service.character(name)
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; name: string }): Promise<Character> {
    return this.service.character(reference.name)
  }
}
