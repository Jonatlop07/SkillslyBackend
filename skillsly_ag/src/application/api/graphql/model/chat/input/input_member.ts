import {Field, ID, InputType} from '@nestjs/graphql';
import {Id} from '@application/common/type/common_types';

@InputType({description: 'Defines the information of a chat member'})
export class InputMember {
  @Field(() => ID)
  public UserID: Id;

  @Field()
  public IsActive: boolean;

  @Field()
  public IsAdmin: boolean;

  @Field({nullable: true})
  public JoinedAt: string;

}
