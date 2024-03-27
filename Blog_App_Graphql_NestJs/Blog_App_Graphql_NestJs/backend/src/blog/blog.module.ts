/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogResolver } from './blog.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Blog } from './blog.entity';
import { SharedBlog } from './shared-blog.entity';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    // list the entities in this module
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Blog]),
    TypeOrmModule.forFeature([SharedBlog]),
  ],
  providers: [BlogService, ConfigService, UserService,BlogResolver],
})
export class BlogModule {}
