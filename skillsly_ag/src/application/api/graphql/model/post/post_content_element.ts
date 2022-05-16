import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType({ description: 'Defines the content of a post' })
export class ContentElement {
  @Field({ nullable: true })
  public description: string;

  @Field({ nullable: true })
  public media_locator: string;

  @Field({ nullable: false })
  public media_type: string;
}