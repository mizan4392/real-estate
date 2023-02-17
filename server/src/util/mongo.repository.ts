import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';
import { Pagination } from './common';

export abstract class MongoRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async finOne(
    userFactoryQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    return this.entityModel
      .findOne(userFactoryQuery, {
        __v: 0,
        ...projection,
      })
      .exec();
  }

  async find(userFactoryQuery: FilterQuery<T>): Promise<T[] | null> {
    return this.entityModel.find(userFactoryQuery);
  }
  async count(userFactoryQuery: FilterQuery<T>): Promise<number | null> {
    return this.entityModel.find(userFactoryQuery).count();
  }
  async findByPagination(
    userFactoryQuery: FilterQuery<T>,
    pagination: Pagination,
  ): Promise<T[] | null> {
    return this.entityModel
      .find(userFactoryQuery)
      .skip((pagination.page - 1) * pagination.limit)
      .limit(pagination.limit)
      .exec();
  }

  async create(createEntityData: unknown): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }

  async findOneAndUpdate(
    userFactoryQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<T | null> {
    return this.entityModel.findOneAndUpdate(
      userFactoryQuery,
      updateEntityData,
      {
        new: true,
      },
    );
  }

  async deleteMany(userFactoryQuery: FilterQuery<T>) {
    const deleteResult = await this.entityModel.deleteMany(userFactoryQuery);
    return deleteResult.deletedCount >= 1;
  }
}
