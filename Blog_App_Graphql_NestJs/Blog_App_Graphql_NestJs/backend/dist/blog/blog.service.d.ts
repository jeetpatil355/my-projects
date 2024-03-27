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
    uploadImg(image: any): Promise<{
        status: string;
        data: unknown;
        message: string;
    } | {
        status: string;
        data: any;
        message?: undefined;
    }>;
    createBlog(title: string, content: string, file_path: string, category_name: string, id: string, is_private: number): Promise<{
        status: string;
        data: string;
    }>;
    catch(error: any): {
        status: string;
        data: any;
    };
    updateBlog(id: number, title: string, content: string, pic: string, category: string, isPrivate: number): Promise<{
        status: string;
        data: string;
    }>;
    getBlogsByUserId(myId: string): Promise<{
        status: string;
        data: any[];
    }>;
    markBlogAsPrivate(blogId: number, userId: string): Promise<{
        status: string;
        data: string;
    }>;
    markBlogAsPublic(blogId: number, userId: string): Promise<{
        status: string;
        data: string;
    }>;
    getPublicBlogs(): Promise<{
        status: string;
        data: Blog[];
    }>;
    getUserByBlogId(blogId: number): Promise<{
        status: string;
        data: string;
    } | {
        status: string;
        data: {
            id: number;
        };
    }>;
    deleteBlogById(blogId: number): Promise<{
        status: string;
        data: string;
    }>;
    getBlogById(blogId: number): Promise<{
        blog_id: number;
        title: string;
        content: string;
        file_path: string;
        category_name: string;
        is_private: number;
        publish_date: Date;
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
        data: any[];
    }>;
    updateIsAddedForSharedUsers(blogId: number, senderId: number): Promise<boolean>;
    unshareBlog(blogId: number, sharedWithUserId: number, senderId: number): Promise<boolean>;
    shareBlog(blogId: any, sharedWithUserId: any, senderId: any): Promise<boolean>;
    searchSharedBlogsByText(userId: number, searchText: string): Promise<any>;
}
