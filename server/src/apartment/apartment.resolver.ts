import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Pagination } from 'src/util/common';
import { ApartmentService } from './apartment.service';
import { APARTMENT_TYPE, FindApartmentResponse } from './dto/common';
import { Apartment } from './entities/apartment.schema';

@Resolver(() => Apartment)
export class ApartmentResolver {
  constructor(private readonly apartmentService: ApartmentService) {}

  @Query(() => FindApartmentResponse!, { name: 'getApartments' })
  getApartments(
    @Args('pagination', { type: () => Pagination, description: 'Pagination' })
    pagination: Pagination,
    @Args('country', {
      type: () => String,
      description: 'country',
      nullable: true,
    })
    country: string,
    @Args('type', {
      type: () => APARTMENT_TYPE,
      description: 'country',
      nullable: true,
    })
    type: APARTMENT_TYPE,
    @Args('price', {
      type: () => String,
      description: 'price range',
      nullable: true,
    })
    price: string,
  ) {
    return this.apartmentService.getApartments(
      {
        country,
        type,
        price,
      },
      pagination,
    );
  }
  @Query(() => Apartment!, { name: 'apartmentDetails' })
  apartmentDetails(
    @Args('apartmentId', { type: () => String, description: 'apartmentId' })
    apartmentId: string,
  ) {
    return this.apartmentService.apartmentDetails(apartmentId);
  }

  //   @Mutation(() => Apartment)
  //   createApartment(
  //     @Args('createApartmentInput') createApartmentInput: CreateApartmentInput,
  //   ) {
  //     return this.apartmentService.create(createApartmentInput);
  //   }

  //   @Query(() => [Apartment], { name: 'apartment' })
  //   findAll() {
  //     return this.apartmentService.findAll();
  //   }

  //   @Query(() => Apartment, { name: 'apartment' })
  //   findOne(@Args('id', { type: () => Int }) id: number) {
  //     return this.apartmentService.findOne(id);
  //   }

  //   @Mutation(() => Apartment)
  //   updateApartment(
  //     @Args('updateApartmentInput') updateApartmentInput: UpdateApartmentInput,
  //   ) {
  //     return this.apartmentService.update(
  //       updateApartmentInput.id,
  //       updateApartmentInput,
  //     );
  //   }

  //   @Mutation(() => Apartment)
  //   removeApartment(@Args('id', { type: () => Int }) id: number) {
  //     return this.apartmentService.remove(id);
  //   }
}
