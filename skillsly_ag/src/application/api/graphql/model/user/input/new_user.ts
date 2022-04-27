import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class NewUser {
  @Field()
  public email: string;

  @Field()
  public password: string;

  @Field()
  public name: string;

  @Field()
  public date_of_birth: string;

  @Field()
  public gender: string;
}
