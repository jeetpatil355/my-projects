import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { SharedBlog } from './shared-blog.entity';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    // list the entities in this module
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Blog]),
    TypeOrmModule.forFeature([SharedBlog]),
  ],
  controllers: [BlogController],
  providers: [BlogService, ConfigService, UserService],
})
export class BlogModule {}
