import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class StatusUpdates {

    @Field()
    public canceled: boolean;
}