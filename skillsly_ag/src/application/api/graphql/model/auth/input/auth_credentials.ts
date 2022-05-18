import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class AuthCredentials {
  @Field({
    nullable: true
  })
  public readonly email: string;

  @Field({
    nullable: true
  })
  public readonly password: string;
}
