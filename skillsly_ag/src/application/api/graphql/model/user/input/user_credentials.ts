import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserCredentials {
  @Field()
  public email: string;

  @Field()
  public password: string;
}
