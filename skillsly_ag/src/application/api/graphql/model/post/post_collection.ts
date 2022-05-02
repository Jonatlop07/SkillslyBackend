import {Field, ObjectType} from '@nestjs/graphql';
import {Post} from '@application/api/graphql/model/post/post';

@ObjectType()
export class PostCollection {
  @Field(() => [Post])
  public posts: Array<Post>;
}