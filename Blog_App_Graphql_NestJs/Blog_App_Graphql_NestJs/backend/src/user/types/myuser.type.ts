/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.type';

@ObjectType()
export class MyUserResponse {
  @Field()
  status: string;

  @Field(() => [User], { nullable: true })
  data: [User];

  @Field(() => User, { nullable: true })
  datas: User;
}