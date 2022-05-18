import {Field, ID, InputType} from '@nestjs/graphql';
import {Id} from '@application/common/type/common_types';
import {PostContentElement} from '@application/api/graphql/model/post/input/content_element';

@InputType()
export class NewPostInputData {
  @Field(() => ID, { nullable: false })
  public owner_id: Id;

  @Field({ nullable: true })
  public description: string;

  @Field({ nullable: false })
  public privacy: string;

  @Field(() => [PostContentElement], { nullable: false })
  public content_element: Array<PostContentElement>;
}