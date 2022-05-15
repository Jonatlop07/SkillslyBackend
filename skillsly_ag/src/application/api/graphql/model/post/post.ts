import {Field, ID, ObjectType} from '@nestjs/graphql';
import {Id} from '@application/common/type/common_types';
import {ContentElement} from '@application/api/graphql/model/post/post_content_element';

@ObjectType({ description: 'Defines the structure of stories' })
export class Post{
  @Field(() => ID)
  public id: Id;

  @Field(() => ID)
  public owner_id: Id;

  @Field({ nullable: true })
  public description: string;

  @Field()
  public created_at: string;

  @Field()
  public updated_at: string;

  @Field()
  public privacy: string;

  @Field (()=>[ContentElement])
  public content_element: Array<ContentElement>;
}
