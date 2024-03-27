import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductResolver } from './product.resolver';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}
