import { BlogService } from './blog.service';
import { UserService } from 'src/user/user.service';
export declare class BlogResolver {
    private blogService;
    private userService;
    constructor(blogService: BlogService, userService: UserService);
    uploadImage(image: string): Promise<{
        status: string;
        data: unknown;
        message: string;
    } | {
        status: string;
        data: any;
        message?: undefined;
    }>;
    createBlog(title: string, content: string, pic: string, category: string, is_private: number, id: string): Promise<{
        status: string;
        data: string;
    }>;
    updateBlog(id: number, title: string, content: string, pic: string, category: string, is_private: number): Promise<{
        status: string;
        data: string;
    }>;
    getBlogsByUserId(id: string): Promise<{
        status: string;
        data: any[];
    }>;
    markBlogAsPrivate(bid: number, uid: string): Promise<{
        status: string;
        data: string;
    }>;
    markBlogAsPublic(bid: number, uid: string): Promise<{
        status: string;
        data: string;
    }>;
    getPublicBlogs(): Promise<{
        status: string;
        data: import("src/blog/blog.entity").Blog[];
    }>;
    getUserByBlogId(id: number): Promise<{
        status: string;
        data: string;
    } | {
        status: string;
        data: {
            id: number;
        };
    }>;
    deleteBlogById(id: number): Promise<{
        status: string;
        data: string;
    }>;
    getBlogById(id: number): Promise<{
        blog_id: number;
        title: string;
        content: string;
        file_path: string;
        category_name: string;
        is_private: number;
        publish_date: Date;
    }>;
    clearAddedUsers(): Promise<boolean>;
    searchBlogsByText(text: string): Promise<{
        status: string;
        data: import("src/blog/blog.entity").Blog[];
    }>;
    searchBlogsByTextForUser(text: string, id: number): Promise<{
        status: string;
        data: import("src/blog/blog.entity").Blog[];
    }>;
    getSharedBlogsForUser(id: number): Promise<{
        status: string;
        data: any[];
    }>;
    updateIsAddedForSharedUsers(blog_id: number, id: number): Promise<boolean>;
    unshareBlog(blog_id: number, shared_with_user_id: number, id: number): Promise<boolean>;
    shareBlog(blog_id: number, shared_with_user_id: number, id: number): Promise<boolean>;
    searchSharedBlogsByText(text: string, id: number): Promise<any>;
}
