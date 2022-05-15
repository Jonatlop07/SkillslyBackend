import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TwoFactorAuthInput {
  @Field()
  public code: string;
}
