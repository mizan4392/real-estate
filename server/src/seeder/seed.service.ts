import { Injectable, Logger } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { NewSeeder } from './seeders/apartment.seeder';

@Injectable()
export class SeedService {
  constructor(private logger: Logger, private moduleRef: ModuleRef) {}

  async seed() {
    const seeder = NewSeeder;
    this.logger.debug(`Seeding:: ${seeder.name}`);
    const theSeeder = this.moduleRef.get(seeder as any);
    await theSeeder.seed();

    return Promise.resolve();
  }
}
