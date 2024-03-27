import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    // typeORM configuration
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: 'root',
      password: 'root',
      database: 'mydb',
      port: 3306,
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      synchronize: true,
    }),

    // graphql configuration
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // playground for making graphql request
      playground: true,

      // generate the schema file automatically
      autoSchemaFile: true,

      // use apollo driver for execution
      driver: ApolloDriver,
    }),

    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
