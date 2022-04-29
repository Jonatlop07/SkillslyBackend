import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Id } from '@application/common/type/common_types'

@ObjectType({ description: 'Defines the content of a story view' })
export class StoryView {
  @Field(() => ID)
  public story_id: Id;

  @Field(() => ID)
  public viewer_id: Id;

  @Field()
  public viewed_at: string;
}
