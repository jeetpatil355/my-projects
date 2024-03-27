import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateProductInputType {
  @Field()
  id: Number;

  @Field()
  title: String;

  @Field()
  description: String;

  @Field()
  price: Number;
}
