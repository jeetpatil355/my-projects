import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
  ) {}

  async createProduct(
    title: String,
    description: String,
    price: Number,
    color: String,
    company: String,
    category: String,
  ) {
    try {
      // create an instance of ProductEntity
      const product = new ProductEntity();
      product.title = title;
      product.description = description;
      product.price = price;
      product.color = color;
      product.company = company;
      product.category = category;
      await this.repository.save(product);
      return product;
    } catch (ex) {
      throw new InternalServerErrorException(ex);
    }
  }

  async getProducts() {
    try {
      const products = await this.repository.find();
      return products;
    } catch (ex) {
      throw new InternalServerErrorException(ex);
    }
  }

  async updateProduct(
    id: Number,
    title: String,
    description: String,
    price: Number,
  ) {
    try {
      const product = await this.repository.findOneBy({ id });
      if (!product) {
        throw new NotFoundException('product does not exist');
      }
      product.title = title;
      product.description = description;
      product.price = price;
      await this.repository.save(product);
      return product;
    } catch (ex) {
      throw new InternalServerErrorException(ex);
    }
  }

  async deleteProduct(id: Number) {
    try {
      const product = await this.repository.findOneBy({ id });
      if (!product) {
        throw new NotFoundException('product does not exist');
      }
      await this.repository.remove(product);
      return true;
    } catch (ex) {
      throw new InternalServerErrorException(ex);
    }
  }
}
