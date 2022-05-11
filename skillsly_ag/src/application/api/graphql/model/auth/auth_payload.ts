import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'Contains the information the user obtains when login' })
export class AuthPayload {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  email: string;

  @Field()
  access_token: string;
}
