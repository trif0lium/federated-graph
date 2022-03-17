import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { Cache } from 'cache-manager'
import { lastValueFrom } from 'rxjs'

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
}
