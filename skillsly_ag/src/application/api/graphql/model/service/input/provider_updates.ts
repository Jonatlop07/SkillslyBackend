import { Id } from '@application/common/type/common_types';
import { InputType, Field, ID } from '@nestjs/graphql';


@InputType()
export class ProviderUpdates {

  @Field()
  public provider_id: Id;
}