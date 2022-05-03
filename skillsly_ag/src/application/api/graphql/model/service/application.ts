import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Id } from '@application/common/type/common_types';

@ObjectType()
export class Application {

    @Field(() => ID)
    public id: number;

    @Field(() => ID)
    public applicant_id: Id;

    @Field({nullable: true})
    public message: string;

    @Field()
    public created_at: string;

    @Field({nullable: true})
    public updated_at: string;

    @Field(() => ID)
    public service_id: number;
}