/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { Blog } from './allblog.type';

@ObjectType()
export class MyBlogResponse {
  @Field()
  status: string;

  @Field(() => [Blog], { nullable: true })
  data: [Blog];

  @Field(() => Blog, { nullable: true })
  datas: Blog;
}