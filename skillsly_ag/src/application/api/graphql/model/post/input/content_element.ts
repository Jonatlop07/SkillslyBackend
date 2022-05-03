import {Field, ID, InputType} from '@nestjs/graphql';
import {Id} from '@application/common/type/common_types';

@InputType()
export class PostContentElement {
  @Field(() => ID)
  public content_element_id: Id;

  @Field()
  public description: string;

  @Field()
  public media_locator: string;
}