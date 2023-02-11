import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => String, { description: 'address', nullable: true })
  address?: string;

  @Field(() => String, { description: 'email', nullable: true })
  email: string;

  @Field(() => String, { description: 'fullName', nullable: true })
  fullName: string;
}
