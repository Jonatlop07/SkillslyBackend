import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType({ description: 'Defines the content of a post' })
export class ContentElement {
  @Field()
  public description: string;

  @Field()
  public media_locator: string;

  @Field()
  public media_type: string;
}