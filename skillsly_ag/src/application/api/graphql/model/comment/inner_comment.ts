import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Id } from '@application/common/type/common_types';
import { CommentUserModel } from '@application/common/model/comment_user_data.model';
import { CommentUser } from './comment_user';

@ObjectType({ description: 'Defines the information of a comment' })
export class InnerComment {
  @Field(() => ID)
  public _id: Id;

  @Field()
  public owner_id: Id;

  @Field({ nullable: true })
  public comment_id: Id;

  @Field({ nullable: true })
  public description: string;

  @Field({ nullable: true })
  public media_locator: string;

  @Field({ nullable: true })
  public media_type: string;

  @Field()
  public created_at: string;

  @Field({ nullable: true })
  public updated_at: string;

  @Field(() => CommentUser)
  public owner: CommentUserModel;
}
