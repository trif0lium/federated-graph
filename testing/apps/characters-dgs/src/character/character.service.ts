import { Injectable } from '@nestjs/common';
import { GenshindevApiService } from '@testing/genshindev-api';
import { Character } from '../entities/character.entity';

@Injectable()
export class CharacterService {
  constructor(private readonly genshindevApi: GenshindevApiService) {}

  async characters(): Promise<string[]> {
    const c = await this.genshindevApi.characters()
    return c
  }

  async character(name: string): Promise<Character> {
    return this.genshindevApi.character(name)
  }
}
