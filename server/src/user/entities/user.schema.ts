import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';
import { ExcludeProperty } from 'nestjs-mongoose-exclude';

@ObjectType()
@Schema()
export class User {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  @Field(() => String, { description: 'id', nullable: true })
  _id: string;

  @Field(() => String, { description: 'fullName' })
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  fullName: string;

  @Field(() => String, { description: 'email' })
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  email: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  @ExcludeProperty()
  @Field(() => String, { description: 'password', nullable: true })
  password: string;

  @Field(() => String, { description: 'profilePic', nullable: true })
  @Prop({ type: mongoose.Schema.Types.String, required: false })
  profilePic?: string;

  @Prop({
    type: mongoose.Schema.Types.Boolean,
    required: false,
    nullable: true,
  })
  @Field(() => Boolean, { description: 'isAdmin', nullable: true })
  @ExcludeProperty()
  isAdmin?: boolean;

  @Field(() => String, { description: 'address', nullable: true })
  @Prop({ type: mongoose.Schema.Types.String, required: false, nullable: true })
  address?: string;

  @ApiProperty({
    required: false,
    description: 'createdAt',
  })
  @Field(() => Boolean, { description: 'createdAt', nullable: true })
  @Prop({ type: mongoose.Schema.Types.Date, required: false })
  createdAt?: Date;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
