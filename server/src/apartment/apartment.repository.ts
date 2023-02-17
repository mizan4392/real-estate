import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/util/mongo.repository';
import { Apartment, ApartmentDocument } from './entities/apartment.schema';

@Injectable()
export class ApartmentRepository extends MongoRepository<ApartmentDocument> {
  constructor(
    @InjectModel(Apartment.name)
    apartmentModel: Model<ApartmentDocument>,
  ) {
    super(apartmentModel);
  }
}
