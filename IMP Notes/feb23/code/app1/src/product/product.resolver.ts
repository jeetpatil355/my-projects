import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductType } from './types/product.type';
import { ProductService } from './product.service';
import { CreateProductInputType } from './types/create.product.input.type';
import { UpdateProductInputType } from './types/update.product.input.type';

@Resolver((of) => ProductType)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Mutation((returns) => ProductType)
  createProduct(@Args('input') input: CreateProductInputType) {
    const { title, description, price, category, company, color } = input;
    return this.productService.createProduct(
      title,
      description,
      price,
      color,
      company,
      category,
    );
  }

  @Mutation((returns) => ProductType)
  updateProduct(@Args('input') input: UpdateProductInputType) {
    const { id, title, description, price } = input;
    return this.productService.updateProduct(id, title, description, price);
  }

  @Mutation((returns) => Boolean)
  deleteProduct(@Args('id') id: Number) {
    return this.productService.deleteProduct(id);
  }

  @Query((returns) => [ProductType])
  products() {
    return this.productService.getProducts();
  }
}
