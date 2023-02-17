import { Injectable } from '@nestjs/common';
import { Pagination } from 'src/util/common';
import { ApartmentRepository } from './apartment.repository';
import { FindApartmentResponse } from './dto/common';

@Injectable()
export class ApartmentService {
  constructor(private readonly apartmentRepository: ApartmentRepository) {}
  async getApartments(
    queryData,
    pagination: Pagination,
  ): Promise<FindApartmentResponse> {
    const filterData: any = {};

    if (queryData?.price) {
      filterData.price = {
        $gte: queryData.price.split('-')[0],
        $lte: queryData.price.split('-')[1],
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
  // findAll() {
  //   return `This action returns all apartment`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} apartment`;
  // }
  // update(id: number, updateApartmentInput: UpdateApartmentInput) {
  //   return `This action updates a #${id} apartment`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} apartment`;
  // }
}
