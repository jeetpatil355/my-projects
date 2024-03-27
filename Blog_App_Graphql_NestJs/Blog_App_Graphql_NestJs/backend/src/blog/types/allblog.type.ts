/* eslint-disable prettier/prettier */
import { ObjectType, Field, Int } from '@nestjs/graphql';


@ObjectType()
export class Blog {
    @Field(() => Int,{ nullable: true })
    blog_id: number;

    @Field({ nullable: true })
    title: string;

    @Field({ nullable: true })
    content: string;

    @Field({ nullable: true })
    file_path: string;

    @Field({ nullable: true })
    category_name: string;

    @Field(() => Int,{ nullable: true })
    is_private: number;

    @Field({ nullable: true })
    publish_date: Date;

    @Field({ nullable: true })
    user: number;
}
