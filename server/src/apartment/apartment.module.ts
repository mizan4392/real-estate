import { Module } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { ApartmentResolver } from './apartment.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Apartment, ApartmentSchema } from './entities/apartment.schema';
import { ApartmentRepository } from './apartment.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Apartment.name,
        schema: ApartmentSchema,
      },
    ]),
  ],
  providers: [ApartmentResolver, ApartmentService, ApartmentRepository],
})
export class ApartmentModule {}
