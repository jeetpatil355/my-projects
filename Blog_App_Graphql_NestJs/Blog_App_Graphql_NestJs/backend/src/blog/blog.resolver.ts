/* eslint-disable prettier/prettier */
import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';
import { BlogType } from './types/blog.type';
import { MyBlogResponse } from './types/myblog.type';
import { BlogResponseType } from './types/blogresponse.type';
import { Blog } from './types/allblog.type';

@Resolver('Blog')
export class BlogResolver {
    constructor(
        private blogService: BlogService,
        private userService: UserService,
    ) {}

    @Mutation(()=>BlogType)
    async uploadImage(@Args('image') image: string) {
        return this.blogService.uploadImg(image);
    }

    @Mutation(()=>BlogType)
    async createBlog(
        @Args('title') title: string,
        @Args('content') content: string,
        @Args('pic') pic: string,
        @Args('category') category: string,
        @Args('is_private') is_private: number,
        @Args('id') id: string,
    ) {

        if (!title) {
            throw new Error('Please fill title');
        } else if (!content) {
            throw new Error('Please fill content');
        } else if (!pic) {
            throw new Error('Please upload image');
        } else if (!category || category === "0") {
            throw new Error('Please select category');
        }
        return this.blogService.createBlog(title, content, pic, category, id, is_private);
    }

    @Mutation(()=>BlogType)
    async updateBlog(
        @Args('id') id: number,
        @Args('title') title: string,
        @Args('content') content: string,
        @Args('pic') pic: string,
        @Args('category') category: string,
        @Args('is_private') is_private: number,
    ) {
        if (!title) {
            throw new Error('Please fill title');
        } else if (!content) {
            throw new Error('Please fill content');
        } else if (!pic) {
            throw new Error('Please upload image');
        } else if (!category || category === "0") {
            throw new Error('Please select category');
        }
        return this.blogService.updateBlog(id, title, content, pic, category, is_private);
    }

    @Mutation(()=>MyBlogResponse)
    async getBlogsByUserId(
        @Args('id') id: string,
    ) {
        return this.blogService.getBlogsByUserId(id);
    }

    @Mutation(() => BlogResponseType)
    async markBlogPrivacy(
        @Args('bid') blogId: number,
        @Args('uid') userId: string,
        @Args('isPrivate') isPrivate: boolean,
) {
    if (isPrivate) {
        return this.blogService.markBlogPrivacy(blogId, userId, true);
    } else {
        return this.blogService.markBlogPrivacy(blogId, userId, false);
    }
}


    @Mutation(()=>MyBlogResponse)
    async getPublicBlogs() {
        return this.blogService.getPublicBlogs();
    }

    @Query(()=>BlogType)
    async getUserByBlogId(@Args('id') id: number) {
        return this.blogService.getUserByBlogId(id);
    }

    @Mutation(()=>BlogType)
    async deleteBlogById(@Args('id') id: number) {
        return this.blogService.deleteBlogById(id);
    }

    @Mutation(()=>Blog)
    async getBlogById(@Args('id') id: number) {
        return this.blogService.getBlogById(id);
    }

    @Mutation(()=>Boolean)
    async clearAddedUsers() {
        return this.userService.clearAddedUsers();
    }

    @Mutation(()=>MyBlogResponse)
    async searchBlogsByText(@Args('text') text: string) {
        return this.blogService.searchBlogsByText(text);
    }

    @Mutation(()=>MyBlogResponse)
    async searchBlogsByTextForUser(
        @Args('text') text: string, 
        @Args('id') id: number, 
    ) {
        return this.blogService.searchBlogsByTextForUser(text, id);
    }

    @Mutation(()=>MyBlogResponse)
    async getSharedBlogsForUser(@Args('id') id: number) {
        return this.blogService.getSharedBlogsForUser(id);
    }

    @Mutation(()=>Boolean)
    async updateIsAddedForSharedUsers(
        @Args('blog_id') blog_id: number,
        @Args('id') id: number,
    ) {
        return this.blogService.updateIsAddedForSharedUsers(blog_id , id);
    }

    @Mutation(()=>Boolean)
    async unshareBlog(
        @Args('blog_id') blog_id: number,
        @Args('share_id') shared_with_user_id: number,
        @Args('id') id: number,
    ) {

        return this.blogService.unshareBlog(blog_id, shared_with_user_id, id);
    }

    @Mutation(()=>Boolean)
    async shareBlog(
        @Args('blog_id') blog_id: number,
        @Args('share_id') shared_with_user_id: number,
        @Args('id') id: number,
        ) {
        return this.blogService.shareBlog(blog_id, shared_with_user_id, id);
    }

    @Mutation(()=>MyBlogResponse)
    async searchSharedBlogsByText(
        @Args('text') text: string,
        @Args('id') id: number,
    ) {
        return this.blogService.searchSharedBlogsByText(id, text);
    }
}
