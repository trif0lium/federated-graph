import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterResolver } from './character.resolver';
import { GenshindevApiModule } from '@testing/genshindev-api'

@Module({
  imports: [GenshindevApiModule],
  providers: [CharacterService, CharacterResolver],
})
export class CharacterModule { }
