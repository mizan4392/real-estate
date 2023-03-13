import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ObjectType,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { OrderService } from './order.service';

import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.schema';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthUser } from 'src/auth/current_user';
import { Apartment } from 'src/apartment/entities/apartment.schema';
import { ApartmentService } from 'src/apartment/apartment.service';
import { User } from 'src/user/entities/user.schema';
import { UserService } from 'src/user/user.service';

@Resolver(() => Order)
@UseGuards(AuthGuard)
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    private readonly apartmentService: ApartmentService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => Order)
  createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
    @AuthUser() user,
  ) {
    return this.orderService.create(createOrderInput, user);
  }

  @Query(() => [Order], { name: 'userOrders' })
  userOrders(@AuthUser() user) {
    return this.orderService.userOrders(user);
  }

  @ResolveField(() => Apartment)
  apartment(@Parent() order: Order) {
    return this.apartmentService.apartmentDetails(order.apartmentId);
  }

  @ResolveField(() => User)
  user(@Parent() order: Order) {
    return this.userService.findUserById(order.userId);
  }
}
