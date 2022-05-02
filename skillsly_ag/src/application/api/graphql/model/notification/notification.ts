import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Id } from '@application/common/type/common_types';

@ObjectType({
  description:
    'Defines the information of a notification to be shown to the user',
})
export class Notifications {
  @Field(() => ID)
  public notifier_id: Id;

  @Field(() => ID)
  public actor_id: Id;

  @Field(() => ID)
  public entity_id: Id;

  @Field()
  public resource_type: string;

  @Field()
  public created_at: string;
}
