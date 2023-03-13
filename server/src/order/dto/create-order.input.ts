import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => String, { description: 'description', nullable: true })
  description?: string;

  @Field(() => String, { description: 'apartmentId' })
  apartmentId: string;
}
