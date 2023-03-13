import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/util/mongo.repository';
import { Order, OrderDocument } from './entities/order.schema';

@Injectable()
export class OrderRepository extends MongoRepository<OrderDocument> {
  constructor(
    @InjectModel(Order.name)
    orderModel: Model<OrderDocument>,
  ) {
    super(orderModel);
  }
}
