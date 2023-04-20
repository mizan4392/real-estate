import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Apartment,
  ApartmentDocument,
} from 'src/apartment/entities/apartment.schema';
import { User, UserDocument } from 'src/user/entities/user.schema';

export interface ISeeder {
  seed(): Promise<void>;
}
export class NewSeeder implements ISeeder {
  constructor(
    @InjectModel(User.name)
    readonly userModel: Model<UserDocument>,
    @InjectModel(Apartment.name)
    readonly apartmentModel: Model<ApartmentDocument>,
    private logger: Logger,
  ) {}

  async seed(): Promise<void> {
    this.logger.log('Seeding Apartments');
    await this.apartmentModel.create(this.createAppartmentData());
    this.logger.log('Apartment seeding completed');
  }

  createAppartmentData() {
    this.logger.log('Creating Apartment Data');
    const apartments: Apartment[] = [];
    const countries = [
      { country: 'United States', city: 'New York' },
      { country: 'Canada', city: 'Montreal' },
      { country: 'United Kingdom', city: 'Manchester' },
    ];
    for (let i = 0; i < 100; i++) {
      const randomIndex = Math.floor(Math.random() * countries.length);
      const apartment = new Apartment();
      apartment.houseName = `House ${i + 1}`;
      apartment.address = `${i + 1} Main St`;
      apartment.country = countries[randomIndex].country;
      apartment.city = countries[randomIndex].city;
      apartment.bio = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;
      apartment.bedrooms = Math.floor(Math.random() * 5) + 1; // random number between 1 and 5
      apartment.bathrooms = Math.floor(Math.random() * 3) + 1; // random number between 1 and 3
      apartment.surface = Math.floor(Math.random() * 500) + 500; // random number between 500 and 999
      apartment.price = Math.floor(Math.random() * 2000) + 1000; // random number between 1000 and 2999
      apartment.type = Math.random() < 0.5 ? 'apartment' : 'house'; // 50/50 chance of 'apartment' or 'house'
      apartments.push(apartment);
    }
    this.logger.log('Created 100 Apartments Data');
    return apartments;
  }
}
