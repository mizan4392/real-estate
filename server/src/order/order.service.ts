import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ORDER_STATUS } from 'src/apartment/dto/common';
import { Apartment } from 'src/apartment/entities/apartment.schema';
import { User } from 'src/user/entities/user.schema';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { OrderRepository } from './order.reposotory';
import { Order, OrderDocument } from './entities/order.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrderService {
  constructor(
    private orderRepo: OrderRepository, // private entityModel: Model<OrderDocument>,
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}
  create(createOrderInput: CreateOrderInput, user) {
    const order = {
      ...createOrderInput,
      orderStatus: ORDER_STATUS.PENDING,
      userId: user.id,
    };

    return this.orderRepo.create(order);
  }

  userOrders(user) {
    return this.orderModel.find({ userId: user?.id });
  }

  findAll() {
    return this.orderRepo.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderInput: UpdateOrderInput) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
