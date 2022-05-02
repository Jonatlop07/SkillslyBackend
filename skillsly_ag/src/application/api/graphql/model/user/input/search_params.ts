import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SearchParams {
  @Field()
  public email: string;

  @Field()
  public name: string;

  @Field(() => Int, { nullable: true })
  public limit: number;

  @Field(() => Int, { nullable: true })
  public offset: number;
}
