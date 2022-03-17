import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { Cache } from 'cache-manager'
import { lastValueFrom } from 'rxjs'
import { Character } from './dto/character.dto'

@Injectable()
export class GenshindevApiService {
  constructor(
    private httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  async characters(): Promise<string[]> {
    const api = 'https://api.genshin.dev/characters'
    const cache = await this.cacheManager.get<string[]>(api)
    if (cache) {
      return Promise.resolve<string[]>(cache)
    }

    const characters = await lastValueFrom(this.httpService.get<string[]>(api))
    await this.cacheManager.set(api, characters)
    return characters.data
  }

  async character(name: string): Promise<Character> {
    const api = 'https://api.genshin.dev/characters/' + name
    const cache = await this.cacheManager.get<Character>(api)
    if (cache) {
      return Promise.resolve<Character>(cache)
    }

    const character = await lastValueFrom(this.httpService.get<Character>(api))
    await this.cacheManager.set(api, character)
    return character.data
  }
}
