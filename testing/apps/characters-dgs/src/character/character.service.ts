import { Injectable } from '@nestjs/common';
import { GenshindevApiService } from '@testing/genshindev-api';
import { AppRequestContext } from '../app/app.request-context';
import { Character } from '../entities/character.entity';

@Injectable()
export class CharacterService {
  constructor(private readonly genshindevApi: GenshindevApiService) {}

  async characters(): Promise<string[]> {
    const ctx: AppRequestContext = AppRequestContext.get()
    console.log('x-edge-date', ctx['x-edge-date'])
    const c = await this.genshindevApi.characters()
    return c
  }

  async character(name: string): Promise<Character> {
    return this.genshindevApi.character(name)
  }
}
