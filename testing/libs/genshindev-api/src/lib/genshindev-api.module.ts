import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { GenshindevApiService } from './genshindev-api.service';

@Module({
  imports: [HttpModule, CacheModule.register()],
  controllers: [],
  providers: [],
  exports: [GenshindevApiService],
})
export class GenshindevApiModule {}
