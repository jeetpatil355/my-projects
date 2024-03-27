/* eslint-disable prettier/prettier */
import { BadRequestException,Body, Controller, Delete, Get, Param, Patch, Post, Put, Request, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('/blog')
export class BlogController {
  constructor(
    private blogService: BlogService,
    private userService: UserService,
    ) { }

  @Post('/uploadImage')
  async uploadImage(@Body('image') image) {
    return this.blogService.uploadImage(image)
  }

  @UseGuards(AuthGuard)
  @Post('/create-blog')
  async createBlog(
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('pic') pic: string,
    @Body('category') category: string,
    @Body('is_private') is_private: number,
    @Request() request,
  ) {
    if (!title) {
      return { status: 'error', data: 'Please fill title' };
    } else if (!content) {
      return { status: 'error', data: 'Please fill content' };
    } else if (!pic) {
      return { status: 'error', data: 'Please upload image' };
    } else if (!category || category === "0") {
      return { status: 'error', data: 'Please select category' };
    }

    return this.blogService.createBlog(title, content, pic, category, request.user.id, is_private);
  }


  @UseGuards(AuthGuard)
  @Put('/update-blog/:id')
  async updateBlog(
    @Param('id') id,
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('pic') pic: string,
    @Body('category') category: string,
    @Body('is_private') is_private: number,
    @Request() request,
  ) {
    if (!title) {
      return { status: 'error', data: 'Please fill title' };
    } else if (!content) {
      return { status: 'error', data: 'Please fill content' };
    } else if (!pic) {
      return { status: 'error', data: 'Please upload image' };
    } else if (!category || category === "0") {
      return { status: 'error', data: 'Please select category' };
    }
    return this.blogService.updateBlog(id, title, content, pic, category, is_private, request);
  }


  @UseGuards(AuthGuard)
    @Get('/get-blogs')
    async getBlogsByUserId(
        @Request() request,
    ) {
        return this.blogService.getBlogsByUserId(request.user.id);
    }


    @UseGuards(AuthGuard)
    @Patch('/:id')
    async markBlogPrivacy(
      @Param('id') id: number,
      @Body('action') action: string, 
      @Request() request,
) {
    const booleanFlag = action === 'private' ? true : false;
    return this.blogService.markBlogPrivacy(id, request.user.id, booleanFlag);
}


    @Get('/public')
    async getPublicBlogs() {
        return this.blogService.getPublicBlogs();
    }


    @Get('/get-user/:id')
    async getUserByBlogId(@Param('id') id: number) {
        return this.blogService.getUserByBlogId(id);
    }

    @Delete('/:id')
    async deleteBlogById(@Param('id') id: number) {
        return this.blogService.deleteBlogById(id);
    }

    @Get('/get-one-blog/:id')
    async getBlogById(@Param('id') id: number) {
        return this.blogService.getBlogById(id);
    }
    

    @Put('/clear-all')
    async clearAddedUsers() {
        return this.userService.clearAddedUsers();
    }


    @Get('/search/:text')
    async searchBlogsByText(@Param('text') text: string) {
        return this.blogService.searchBlogsByText(text);
    }


    @UseGuards(AuthGuard)
    @Get('/my-search/:text')
    async searchBlogsByTextForUser(@Param('text') text: string, @Request() request) {
        return this.blogService.searchBlogsByTextForUser(text, request.user.id);
    }

    @UseGuards(AuthGuard)
    @Get('/shared')
    async getSharedBlogsForUser(@Request() request) {
        return this.blogService.getSharedBlogsForUser(request.user.id);
    }


    @UseGuards(AuthGuard)
    @Put('/update-add-user')
    async updateIsAddedForSharedUsers(@Request() request, @Body() { blog_id }: { blog_id: number }) {
        return this.blogService.updateIsAddedForSharedUsers(blog_id, request.user.id);
    }


    @UseGuards(AuthGuard)
    @Post('/unshared')
    async unshareBlog(@Request() request, @Body() { blog_id, shared_with_user_id }: { blog_id: number, shared_with_user_id: number }) {
        return this.blogService.unshareBlog(blog_id, shared_with_user_id, request.user.id);
    }

    @UseGuards(AuthGuard)
    @Post('/share-blog')
    async shareBlog(@Request() request, @Body() { blog_id, shared_with_user_id }: { blog_id: number, shared_with_user_id: number }){
        return this.blogService.shareBlog(blog_id, shared_with_user_id, request.user.id);
    }

    @UseGuards(AuthGuard)
    @Get('/shared-search/:text')
    async searchSharedBlogsByText(@Request() request, @Param('text') searchText: string){
        return this.blogService.searchSharedBlogsByText(request.user.id, searchText);
    }
}
