import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserAccountUpdates {
  @Field({ nullable: true })
  public email: string;

  @Field({ nullable: true })
  public name: string;

  @Field({ nullable: true })
  public date_of_birth: string;

  @Field({ nullable: true })
  public gender: string;
}
