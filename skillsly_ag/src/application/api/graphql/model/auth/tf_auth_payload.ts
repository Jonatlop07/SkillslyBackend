import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TFAuthPayload {
  @Field(() => ID)
    id: string;

  @Field()
    email: string;

  @Field()
    access_token: string;

  @Field(() => Boolean)
    is_two_factor_auth_enabled: boolean;
}
