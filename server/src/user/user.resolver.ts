import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.schema';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthUser } from 'src/auth/current_user';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User!, { name: 'getUserDetails' })
  @UseGuards(AuthGuard)
  @UseInterceptors(new SanitizeMongooseModelInterceptor())
  getUserDetails(@AuthUser() user) {
    return this.userService.findUserById(user?.id);
  }

  @Mutation(() => Boolean)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @AuthUser() user,
  ) {
    return this.userService.update(user?.id, updateUserInput);
  }

  // @Mutation(() => User)
  // removeUser(@Args('id', { type: () => Int }) id: number) {
  //   return this.userService.remove(id);
  // }
}
