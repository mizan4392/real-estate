import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';
import { ExcludeProperty } from 'nestjs-mongoose-exclude';
@Schema()
@ObjectType()
export class User {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  @Field(() => String, { description: 'id' })
  id: string;

  @ApiProperty({
    required: true,
    description: 'Full Name',
  })
  @Field(() => String, { description: 'fullName' })
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  fullName: string;

  @ApiProperty({
    required: true,
    description: 'Email',
  })
  @Field(() => String, { description: 'email' })
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  email: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  @ExcludeProperty()
  @Field(() => String, { description: 'password' })
  password: string;

  @ApiProperty({
    required: false,
    description: 'Profile Pic',
  })
  @Field(() => String, { description: 'profilePic' })
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  profilePic?: string;

  @Prop({ type: mongoose.Schema.Types.Boolean, required: false })
  @Field(() => Boolean, { description: 'isAdmin' })
  @ExcludeProperty()
  isAdmin?: boolean;

  @ApiProperty({
    required: false,
    description: 'address',
  })
  @Field(() => Boolean, { description: 'address' })
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  address?: string;

  @ApiProperty({
    required: false,
    description: 'createdAt',
  })
  @Field(() => Boolean, { description: 'createdAt' })
  @Prop({ type: mongoose.Schema.Types.Date, required: false })
  createdAt?: Date;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
