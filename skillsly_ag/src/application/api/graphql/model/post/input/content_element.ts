import {Field, InputType} from '@nestjs/graphql';
import {Nullable} from '@application/common/type/common_types';

@InputType()
export class PostContentElement {
  @Field({ nullable: true })
  public description: string;

  @Field({ nullable: true })
  public media_locator: string;

  @Field({ nullable: false })
  public media_type: string;
}