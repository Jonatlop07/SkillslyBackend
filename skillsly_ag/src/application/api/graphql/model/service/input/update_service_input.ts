import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ServiceUpdates {

    @Field({ nullable: true })
    public title: string;

    @Field({ nullable: true })
    public description: string;

    @Field({ nullable: true })
    public contact_info: string;

    @Field({ nullable: true })
    public category: string;
}