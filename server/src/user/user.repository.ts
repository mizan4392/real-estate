import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/util/mongo.repository';
import { User, UserDocument } from './entities/user.schema';

@Injectable()
export class UserRepository extends MongoRepository<UserDocument> {
  constructor(
    @InjectModel(User.name)
    userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }
}
