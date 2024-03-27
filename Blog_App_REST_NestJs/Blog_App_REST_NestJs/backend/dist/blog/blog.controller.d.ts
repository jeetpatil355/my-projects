import { BlogService } from './blog.service';
import { UserService } from 'src/user/user.service';
export declare class BlogController {
    private blogService;
    private userService;
    constructor(blogService: BlogService, userService: UserService);
    uploadImage(image: any): Promise<{
        status: string;
        data: any;
    }>;
    createBlog(title: string, content: string, pic: string, category: string, is_private: number, request: any): Promise<{
        status: string;
        data: string;
    }>;
    updateBlog(id: any, title: string, content: string, pic: string, category: string, is_private: number, request: any): Promise<{
        status: string;
        data: string;
    }>;
    getBlogsByUserId(request: any): Promise<{
        status: string;
        data: import("./blog.entity").Blog[];
    }>;
    markBlogAsPrivate(id: number, request: any): Promise<{
        status: string;
        data: string;
    }>;
    markBlogAsPublic(id: number, request: any): Promise<any>;
    getPublicBlogs(): Promise<any>;
    getUserByBlogId(id: number): Promise<{
        status: string;
        data: string;
    } | {
        status: string;
        data: {
            id: number;
            firstName: string;
            lastName: string;
        };
    }>;
    deleteBlogById(id: number): Promise<{
        status: string;
        data: string;
    }>;
    getBlogById(id: number): Promise<{
        status: string;
        data: string;
    } | {
        status: string;
        data: import("./blog.entity").Blog;
    }>;
    clearAddedUsers(): Promise<{
        status: string;
        data: string;
    }>;
    searchBlogsByText(text: string): Promise<{
        status: string;
        data: import("./blog.entity").Blog[];
    }>;
    searchBlogsByTextForUser(text: string, request: any): Promise<{
        status: string;
        data: import("./blog.entity").Blog[];
    }>;
    getSharedBlogsForUser(request: any): Promise<{
        status: string;
        data: import("./blog.entity").Blog[][];
    }>;
    updateIsAddedForSharedUsers(request: any, { blog_id }: {
        blog_id: number;
    }): Promise<{
        status: string;
        data: string;
    }>;
    unshareBlog(request: any, { blog_id, shared_with_user_id }: {
        blog_id: number;
        shared_with_user_id: number;
    }): Promise<{
        status: string;
        data: {
            share: import("typeorm").DeleteResult;
            message: string;
        };
    } | {
        status: string;
        data: string;
    }>;
    shareBlog(request: any, { blog_id, shared_with_user_id }: {
        blog_id: number;
        shared_with_user_id: number;
    }): Promise<{
        status: string;
        data: {
            share: import("typeorm").InsertResult;
            message: string;
        };
    } | {
        status: string;
        data: string;
    }>;
    searchSharedBlogsByText(request: any, searchText: string): Promise<any>;
}
