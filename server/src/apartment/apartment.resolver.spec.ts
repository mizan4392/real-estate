import { Test, TestingModule } from '@nestjs/testing';
import { ApartmentResolver } from './apartment.resolver';
import { ApartmentService } from './apartment.service';

describe('ApartmentResolver', () => {
  let resolver: ApartmentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApartmentResolver, ApartmentService],
    }).compile();

    resolver = module.get<ApartmentResolver>(ApartmentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
