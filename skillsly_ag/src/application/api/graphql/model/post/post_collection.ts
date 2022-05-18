import {Field, ObjectType} from '@nestjs/graphql';
import {Post} from '@application/api/graphql/model/post/post';
import {UserModel} from '@application/common/model/user.model';
import {User} from "@application/api/graphql/model/user/user";

@ObjectType()
export class PostCollection {
  @Field(() => [Post])
  public posts: Array<Post>;

  @Field(type => User)
  public owner: UserModel;
}