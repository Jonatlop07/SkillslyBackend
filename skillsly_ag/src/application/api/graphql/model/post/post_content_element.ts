import {Field, ID, ObjectType} from '@nestjs/graphql';
import {Id} from '@application/common/type/common_types';

@ObjectType({ description: 'Defines the content of a post' })
export class ContentElement {
  @Field(() => ID)
  public content_element_id: Id;

  @Field()
  public description: string;

  @Field()
  public media_locator: string;
}