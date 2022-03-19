import { Test, TestingModule } from '@nestjs/testing';
import { DgsResolver } from './dgs.resolver';

describe('DgsResolver', () => {
  let resolver: DgsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DgsResolver],
    }).compile();

    resolver = module.get<DgsResolver>(DgsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
