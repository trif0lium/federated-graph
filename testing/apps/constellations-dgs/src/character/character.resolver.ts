import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Character } from '../entities/character.entity';
import { Constellation } from '../entities/constellation.entity';
import { CharacterService } from './character.service';

@Resolver(() => Character)
export class CharacterResolver {
  constructor(private readonly service: CharacterService) { }

  @ResolveField(() => [Constellation])
  async constellations(@Parent() character: Character): Promise<Constellation[]> {
    return this.service.constellations(character.name)
  }
}
