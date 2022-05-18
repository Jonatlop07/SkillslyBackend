import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { Id } from '@application/common/type/common_types';
import { CommentUser } from './comment_user';
import { CommentUserModel } from '@application/common/model/comment_user_data.model';

@ObjectType({ description: 'Defines the information of a comment' })
export class Comment {
  @Field(() => ID)
  public _id: Id;

  @Field()
  public owner_id: Id;

  @Field({ nullable: true })
  public post_id: Id;

  @Field({ nullable: true })
  public description: string;

  @Field({ nullable: true })
  public media_locator: string;

  @Field({ nullable: true })
  public media_type: string;

  @Field(() => Int, { nullable: true })
  public inner_comment_count: number;

  @Field()
  public created_at: string;

  @Field({ nullable: true })
  public updated_at: string;

  @Field(() => CommentUser)
  public owner: CommentUserModel;
}
