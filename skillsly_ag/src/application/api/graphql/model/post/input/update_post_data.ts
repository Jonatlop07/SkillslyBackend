import {Field, ID, InputType} from '@nestjs/graphql';
import {Id} from '@application/common/type/common_types';
import {PostContentElement} from '@application/api/graphql/model/post/input/content_element';

@InputType()
export class UpdatePostInputData {
  @Field(() => ID)
  public post_id: Id;

  @Field(() => ID)
  public owner_id: Id;

  @Field()
  public description: string;

  @Field()
  public privacy: string;

  @Field(() => [PostContentElement])
  public content_element: Array<PostContentElement>;
}