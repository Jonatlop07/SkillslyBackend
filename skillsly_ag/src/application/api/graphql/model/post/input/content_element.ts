import {Field, InputType} from '@nestjs/graphql';
import {Nullable} from '@application/common/type/common_types';

@InputType()
export class PostContentElement {
  @Field()
  public description: Nullable<string>;

  @Field()
  public media_locator: string;

  @Field()
  public media_type: string;
}