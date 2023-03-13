import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { User } from 'src/user/entities/user.schema';

@ObjectType()
@Schema()
export class Order {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  @Field(() => String, { description: 'id', nullable: true })
  _id: string;

  @Field(() => String, { description: 'apartmentId' })
  @Prop({
    type: String,
    required: true,
  })
  apartmentId: string;

  @Field(() => String, { description: 'orderStatus' })
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  orderStatus: string;

  @Field(() => String, { description: 'description' })
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  description: string;

  @Field(() => String, { description: 'userId' })
  @Prop({ type: mongoose.Schema.Types.String, required: false, ref: User.name })
  userId: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

export type OrderDocument = Order & Document;
