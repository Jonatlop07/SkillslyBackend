import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ApplicationUpdates {

    @Field()
    public message: string;
}