import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@ObjectType()
@Schema()
export class Apartment {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  @Field(() => String, { description: 'id', nullable: true })
  _id: string;

  @Field(() => String, { description: 'houseName' })
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  houseName: string;

  @Field(() => String, { description: 'address' })
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  address: string;

  @Field(() => String, { description: 'country' })
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  country: string;

  @Field(() => String, { description: 'city' })
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  city: string;

  @Field(() => String, { description: 'bio' })
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  bio: string;

  @Field(() => String, { description: 'totalBed' })
  @Prop({ type: mongoose.Schema.Types.Number, required: false })
  bedrooms: number;

  @Field(() => String, { description: 'totalBath' })
  @Prop({ type: mongoose.Schema.Types.Number, required: false })
  bathrooms: number;

  @Field(() => String, { description: 'totalBath' })
  @Prop({ type: mongoose.Schema.Types.Number, required: false })
  surface: number;

  @Field(() => String, { description: 'totalBath' })
  @Prop({ type: mongoose.Schema.Types.Number, required: false })
  price: number;

  @Field(() => String, { description: 'totalBath' })
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  type: string;
}

export const ApartmentSchema = SchemaFactory.createForClass(Apartment);

export type ApartmentDocument = Apartment & Document;
