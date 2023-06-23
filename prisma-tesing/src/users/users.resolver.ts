import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User as UserModel } from '@prisma/client';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async registerUser(
    @Args('registerUser') registerUserInput: { name?: string; email: string },
  ): Promise<UserModel> {
    return await this.usersService.createUser(registerUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.users({});
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.user({ id });
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: number,
    @Args('updateUserInput')
    updateUserInput: {
      name?: string;
      email: string;
    },
  ) {
    return await this.usersService.updateUser({
      where: { id },
      data: updateUserInput,
    });
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.deleteUser({ id });
  }
}
