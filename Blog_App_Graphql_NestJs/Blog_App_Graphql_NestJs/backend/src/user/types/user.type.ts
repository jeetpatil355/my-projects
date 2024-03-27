/* eslint-disable prettier/prettier */
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
    @Field()
    id: number;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    email: string;

    @Field()
    phone_number: string;

    @Field()
    password: string;

    @Field()
    is_added: number;

    @Field()
    created_at: Date;
}
