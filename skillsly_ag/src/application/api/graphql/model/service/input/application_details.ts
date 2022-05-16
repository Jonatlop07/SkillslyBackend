import { Field, ID, InputType } from '@nestjs/graphql';
import { Id } from '@application/common/type/common_types';

@InputType()
export class ApplicationDetails {
  @Field(() => ID)
  public idService: number;

  @Field(() => ID)
  public applicant_id: Id;

  @Field({nullable: true })
  public message: string;
}