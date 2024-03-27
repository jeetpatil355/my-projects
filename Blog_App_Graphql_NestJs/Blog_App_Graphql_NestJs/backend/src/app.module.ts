/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { ConfigAppModule } from './config/config.module';
import { ConfigModule } from '@nestjs/config';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    UserModule,

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: 'root',
      password: 'root',
      database: 'myblog',
      port: 3306,
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      synchronize: true,
    }),

    BlogModule,
    ConfigAppModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
GraphQLModule.forRoot<ApolloDriverConfig>({
      // playground for making graphql request
      playground: true,

      
      // use apollo driver for execution
      driver: ApolloDriver,

      // generate the schema file automatically
      autoSchemaFile: true,
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
