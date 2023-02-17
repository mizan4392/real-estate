import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Pagination' })
export class Pagination {
  @Field()
  page: number;
  @Field()
  limit: number;
}
