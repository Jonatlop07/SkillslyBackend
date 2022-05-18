import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Id } from '@application/common/type/common_types';

@ObjectType()
export class Service {

  @Field(() => ID)
  public id: number;

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

  @Field()
  public phase: string;

  @Field()
  public created_at: string;

  @Field({nullable: true})
  public updated_at: string;

  @Field(() => ID, {nullable: true})
  public provider_id: Id;

  @Field()
  public canceled: boolean;
}