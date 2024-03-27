/* eslint-disable prettier/prettier */
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserResponse {
    @Field()
    status: string;

    @Field()
    data: string;
}

