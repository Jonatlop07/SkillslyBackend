import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Id } from '@application/common/type/common_types';
import { StoryView } from '@application/api/graphql/model/story/story_view';

@ObjectType({ description: 'Defines the structure of stories' })
export class Story {
  @Field(() => ID)
  public id: Id;

  @Field(() => ID)
  public owner_id: Id;

  @Field({ nullable: true })
  public description: string;

  @Field({ nullable: true })
  public media_locator: string;

  @Field()
  public created_at: string;

  @Field(() => [StoryView])
  public views: Array<StoryView>;
}
