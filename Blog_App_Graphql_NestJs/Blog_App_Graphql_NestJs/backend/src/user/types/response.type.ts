/* eslint-disable prettier/prettier */

import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ResponseType {
    @Field()
    status: string;

    @Field()
    data: string | null;

    @Field()
    firstName: string | null;

    @Field()
    lastName: string | null;

    @Field()
    email: string | null;

    @Field()
    phone_number: string | null;

    @Field()
    created_at: Date | null;
}