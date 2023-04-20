import { Logger, Module } from '@nestjs/common';
import { NewSeeder } from './seeders/apartment.seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from 'src/util/environment';
import { User, UserSchema } from 'src/user/entities/user.schema';
import { SeedService } from './seed.service';
import {
  Apartment,
  ApartmentSchema,
} from 'src/apartment/entities/apartment.schema';

@Module({
  imports: [
    MongooseModule.forRoot(environment.mongoUrl, {
      dbName: 'realstate',
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Apartment.name,
        schema: ApartmentSchema,
      },
    ]),
  ],
  providers: [NewSeeder, Logger, SeedService],
})
export class SeederModule {}
