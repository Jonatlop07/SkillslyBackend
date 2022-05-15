import { Field, ID, InputType } from '@nestjs/graphql';
import { Id } from '@application/common/type/common_types';

@InputType()
export class ServiceDetails {
  @Field(() => ID)
  public requester_id: Id;

  @Field()
  public title: string;

  @Field()
  public description: string;

  @Field()
  public contact_info: string;

  @Field()
  public category: string;
}