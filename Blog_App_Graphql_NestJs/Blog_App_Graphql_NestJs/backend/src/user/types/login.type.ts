/* eslint-disable prettier/prettier */
import { ObjectType, Field } from '@nestjs/graphql';


@ObjectType()
export class LoginType {
    @Field()
    status: string;

    @Field()
    data: string;

    @Field()
    token: string;

    @Field()
    id: string;
}

