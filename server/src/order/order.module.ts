import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { OrderRepository } from './order.reposotory';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.schema';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/util/environment';
import { ApartmentModule } from 'src/apartment/apartment.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '60d' },
    }),
    ApartmentModule,
    UserModule,
  ],
  providers: [OrderResolver, OrderService, OrderRepository],
})
export class OrderModule {}
