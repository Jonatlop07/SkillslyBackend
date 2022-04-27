import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Id } from '@application/common/type/common_types'

@ObjectType({ description: 'Defines the information of a user\'s account' })
export class User {
  @Field(() => ID)
  public id: Id;

  @Field()
  public email: string;

  @Field()
  public name: string;

  @Field()
  public date_of_birth: string;

  @Field()
  public gender: string;

  @Field()
  public created_at: string;

  @Field({ nullable: true })
  public updated_at: string;
}
