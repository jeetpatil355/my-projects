import { ConfigService } from "@nestjs/config";
import { Blog } from './blog.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { SharedBlog } from './shared-blog.entity';
export declare class BlogService {
    private readonly configService;
    private blogRepository;
    private readonly userRepository;
    private readonly sharedBlogRepository;
    constructor(configService: ConfigService, blogRepository: Repository<Blog>, userRepository: Repository<User>, sharedBlogRepository: Repository<SharedBlog>);
    uploadImage(image: any): Promise<{
        status: string;
        data: any;
    }>;
    createBlog(title: string, content: string, file_path: string, category_name: string, id: any, is_private: number): Promise<{
        status: string;
        data: string;
    }>;
    catch(error: any): {
        status: string;
        data: any;
    };
    updateBlog(id: any, title: string, content: string, pic: string, category: string, isPrivate: number, request: any): Promise<{
        status: string;
        data: string;
    }>;
    getBlogsByUserId(userId: number): Promise<{
        status: string;
        data: Blog[];
    }>;
    markBlogAsPrivate(blogId: number, userId: number): Promise<{
        status: string;
        data: string;
    }>;
    markBlogAsPublic(blogId: number, userId: number): Promise<any>;
    getPublicBlogs(): Promise<any>;
    getUserByBlogId(blogId: number): Promise<{
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
    deleteBlogById(blogId: number): Promise<{
        status: string;
        data: string;
    }>;
    getBlogById(blogId: number): Promise<{
        status: string;
        data: string;
    } | {
        status: string;
        data: Blog;
    }>;
    searchBlogsByText(text: string): Promise<{
        status: string;
        data: Blog[];
    }>;
    searchBlogsByTextForUser(text: string, userId: number): Promise<{
        status: string;
        data: Blog[];
    }>;
    getSharedBlogsForUser(userId: number): Promise<{
        status: string;
        data: Blog[][];
    }>;
    updateIsAddedForSharedUsers(blogId: number, senderId: number): Promise<{
        status: string;
        data: string;
    }>;
    unshareBlog(blogId: number, sharedWithUserId: number, senderId: number): Promise<{
        status: string;
        data: {
            share: import("typeorm").DeleteResult;
            message: string;
        };
    } | {
        status: string;
        data: string;
    }>;
    shareBlog(blogId: any, sharedWithUserId: any, senderId: any): Promise<{
        status: string;
        data: {
            share: import("typeorm").InsertResult;
            message: string;
        };
    } | {
        status: string;
        data: string;
    }>;
    searchSharedBlogsByText(userId: number, searchText: string): Promise<any>;
}
