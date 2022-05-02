import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class NotificationQueryParams {
  @Field(() => Int, { nullable: true })
  public limit: number;

  @Field(() => Int, { nullable: true })
  public offset: number;
}
