import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Apartment } from '../entities/apartment.schema';

@ObjectType({
  description: `Find Apartment Response`,
})
export class FindApartmentResponse {
  @Field(() => Int, { description: 'Number of Apartments' })
  total: number;
  @Field(() => [Apartment], { description: 'Apartments' })
  apartments: Apartment[];
}

export enum APARTMENT_TYPE {
  APARTMENT = 'Apartment',
  HOUSE = 'House',
  ALL = 'all',
}

export enum ORDER_STATUS {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}
registerEnumType(APARTMENT_TYPE, {
  name: 'ORDER_STATUS',
  description: 'Order status',
});
registerEnumType(APARTMENT_TYPE, {
  name: 'APARTMENT_TYPE',
  description: 'The available type of appartment',
});
