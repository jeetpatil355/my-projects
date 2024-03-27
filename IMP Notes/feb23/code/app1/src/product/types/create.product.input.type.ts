import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductInputType {
  @Field()
  title: String;

  @Field()
  description: String;

  @Field()
  price: Number;

  @Field()
  category: String;

  @Field()
  color: String;

  @Field()
  company: String;
}
