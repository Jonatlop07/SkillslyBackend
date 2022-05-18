import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ListServiceParams {

  @Field({ nullable: true })
  public category: string;

  @Field({ nullable: true })
  public requester_id: string;
}