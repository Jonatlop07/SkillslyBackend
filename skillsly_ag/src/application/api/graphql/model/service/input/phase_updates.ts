import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class PhaseUpdates {

    @Field()
    public phase: string;
}