import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.schema';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  findUserByEmail(email: string) {
    return this.userRepository.finOne({ email: email });
  }

  async findUserById(id: string) {
    const user = await this.userRepository.finOne({ _id: id });
    return user;
  }

  createUser(userInfo: Partial<User>) {
    return this.userRepository.create(userInfo);
  }

  create(createUserInput: CreateUserInput) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    console.log('updateUserInput', updateUserInput);
    try {
      await this.userRepository.findOneAndUpdate(
        {
          id: id,
        },
        updateUserInput,
      );
      return true;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
