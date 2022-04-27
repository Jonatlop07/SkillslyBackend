import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'Credentials to sign up and login' })
export class UserCredentials {
  @Field()
  public email: string;

  @Field()
  public password: string;
}
