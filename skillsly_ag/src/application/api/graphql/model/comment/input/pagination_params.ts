import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginationParams {
  @Field(() => Int, { nullable: true })
  public limit: number;

  @Field(() => Int, { nullable: true })
  public page: number;
}
