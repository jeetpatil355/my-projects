import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductType {
  @Field((type) => ID)
  id: Number;

  @Field()
  title: String;

  @Field()
  description: String;

  @Field((type) => Int)
  price: Number;

  @Field()
  color: String;

  @Field()
  category: String;

  @Field()
  company: String;
}
