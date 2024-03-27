/* eslint-disable prettier/prettier */
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class BlogType {
    @Field()
    status: string;

    @Field()
    data: string;

    @Field()
    message: string;
}

