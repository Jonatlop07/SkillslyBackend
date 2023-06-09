import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FollowRequestDetails {
  @Field(() => ID)
    id: string;

  @Field()
    name: string;

  @Field()
    email: string;

  @Field()
    gender: string;
}
