import { Injectable } from '@nestjs/common';
import { Pagination } from 'src/util/common';
import { ApartmentRepository } from './apartment.repository';
import { FindApartmentResponse } from './dto/common';

@Injectable()
export class ApartmentService {
  constructor(private readonly apartmentRepository: ApartmentRepository) {
    // this.seedAppartments();
  }
  async getApartments(
    queryData,
    pagination: Pagination,
  ): Promise<FindApartmentResponse> {
    const filterData: any = {};

    if (queryData?.price) {
      filterData.price = {
        $gte: queryData.price.split('-')[0].trim(),
        $lte: queryData.price.split('-')[1].trim(),
      };
    }
    if (queryData?.country) {
      filterData['country'] = queryData?.country;
    }
    if (queryData?.type) {
      filterData['type'] = queryData?.type;
    }

    const [data, total] = await Promise.all([
      this.apartmentRepository.findByPagination(filterData, pagination),
      this.apartmentRepository.count(filterData),
    ]);

    return {
      total: total,
      apartments: data,
    };
  }
  create(data) {
    return this.apartmentRepository.create(data);
  }

  apartmentDetails(apartmentId: string) {
    return this.apartmentRepository.finOne({
      _id: apartmentId,
    });
  }

  seedAppartments() {
    const data = [
      {
        houseName: 'Modern Loft',
        address: '456 Elm Street',
        country: 'United States',
        city: 'New York',
        bio: 'A spacious and stylish loft in the heart of Manhattan',
        bedrooms: 1,
        bathrooms: 1,
        surface: 800,
        price: 2500,
        type: 'Apartment',
      },
      {
        houseName: 'Cozy Bungalow',
        address: '789 Maple Ave',
        country: 'Canada',
        city: 'Toronto',
        bio: 'A charming bungalow in a quiet neighborhood',
        bedrooms: 2,
        bathrooms: 1,
        surface: 1200,
        price: 1500,
        type: 'House',
      },
      {
        houseName: 'Luxury Penthouse',
        address: '1010 Park Ave',
        country: 'United States',
        city: 'Chicago',
        bio: 'An elegant penthouse with stunning city views',
        bedrooms: 3,
        bathrooms: 3,
        surface: 2000,
        price: 8000,
        type: 'Condo',
      },
      {
        houseName: 'Rustic Cabin',
        address: '222 Forest Rd',
        country: 'Canada',
        city: 'Vancouver',
        bio: 'A cozy cabin in the woods with a fireplace',
        bedrooms: 1,
        bathrooms: 1,
        surface: 600,
        price: 1200,
        type: 'Cabin',
      },
      {
        houseName: 'Beachfront Villa',
        address: '555 Ocean Blvd',
        country: 'Mexico',
        city: 'Cancun',
        bio: 'A luxurious villa on the white sandy beaches of Cancun',
        bedrooms: 4,
        bathrooms: 4,
        surface: 3000,
        price: 12000,
        type: 'Villa',
      },
      {
        houseName: 'City View Apartment',
        address: '777 Main St',
        country: 'Canada',
        city: 'Montreal',
        bio: 'A modern apartment with stunning city views',
        bedrooms: 2,
        bathrooms: 2,
        surface: 1000,
        price: 3000,
        type: 'Apartment',
      },
      {
        houseName: 'Spacious Townhouse',
        address: '999 York Rd',
        country: 'United States',
        city: 'Boston',
        bio: 'A large and comfortable townhouse in a historic neighborhood',
        bedrooms: 3,
        bathrooms: 2,
        surface: 1800,
        price: 5000,
        type: 'Townhouse',
      },
      {
        houseName: 'Mountain Chalet',
        address: '444 Ski Hill Rd',
        country: 'Canada',
        city: 'Whistler',
        bio: 'A charming chalet in the mountains with ski-in/ski-out access',
        bedrooms: 2,
        bathrooms: 1,
        surface: 1200,
        price: 3500,
        type: 'Chalet',
      },
      {
        houseName: 'Historic Brownstone',
        address: '222 Beacon St',
        country: 'United States',
        city: 'New York',
        bio: 'A classic brownstone in the heart of the Upper East Side',
        bedrooms: 4,
        bathrooms: 3,
        surface: 2500,
        price: 9000,
        type: 'Brownstone',
      },
      {
        houseName: 'Modern Villa',
        address: '1234 Sunset Blvd',
        country: 'Spain',
        city: 'Barcelona',
        bio: 'A stunning contemporary villa with panoramic views',
        bedrooms: 5,
        bathrooms: 4,
        surface: 4000,
        price: 15000,
        type: 'Villa',
      },
      {
        houseName: 'Quaint Cottage',
        address: '567 Rose St',
        country: 'United Kingdom',
        city: 'London',
        bio: 'A cozy and charming cottage in a peaceful setting',
        bedrooms: 1,
        bathrooms: 1,
        surface: 500,
        price: 1000,
        type: 'Cottage',
      },
      {
        houseName: 'Modern Townhome',
        address: '890 Pine St',
        country: 'Canada',
        city: 'Vancouver',
        bio: 'A sleek and contemporary townhome in a desirable location',
        bedrooms: 3,
        bathrooms: 3,
        surface: 2000,
        price: 6000,
        type: 'Townhouse',
      },
      {
        houseName: 'Traditional Farmhouse',
        address: '111 Farm Rd',
        country: 'France',
        city: 'Provence',
        bio: 'A rustic and charming farmhouse in the French countryside',
        bedrooms: 4,
        bathrooms: 2,
        surface: 3000,
        price: 8000,
        type: 'Farmhouse',
      },
      {
        houseName: 'Beach House',
        address: '222 Ocean Ave',
        country: 'United States',
        city: 'Miami',
        bio: 'A stylish beach house with a private pool and ocean views',
        bedrooms: 2,
        bathrooms: 2,
        surface: 1500,
        price: 5000,
        type: 'House',
      },
      {
        houseName: 'Luxury Condo',
        address: '333 Bay St',
        country: 'Canada',
        city: 'Toronto',
        bio: 'A high-end condo in the heart of the financial district',
        bedrooms: 2,
        bathrooms: 2,
        surface: 1200,
        price: 4000,
        type: 'Condo',
      },
      {
        houseName: 'Historic Mansion',
        address: '456 Main St',
        country: 'United States',
        city: 'Philadelphia',
        bio: 'An elegant mansion with historic charm and modern amenities',
        bedrooms: 6,
        bathrooms: 4,
        surface: 5000,
        price: 12000,
        type: 'Mansion',
      },
    ];
    data?.map((itm) => {
      this.create(itm);
    });
  }
}
