import { Injectable } from '@nestjs/common';
import { GenshindevApiService } from '@testing/genshindev-api';
import { Constellation } from '../entities/constellation.entity';

@Injectable()
export class CharacterService {
  constructor(private readonly genshindevApi: GenshindevApiService) {}

  async constellations(characterName: string): Promise<Constellation[]> {
    const c = await this.genshindevApi.character(characterName)
    return c.constellations
  }
}
