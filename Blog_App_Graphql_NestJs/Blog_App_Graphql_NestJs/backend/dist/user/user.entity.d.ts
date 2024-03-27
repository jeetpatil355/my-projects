import { Blog } from '../blog/blog.entity';
import { SharedBlog } from '../blog/shared-blog.entity';
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone_number: string;
    password: string;
    is_added: number;
    created_at: Date;
    blogs: Blog[];
    sentSharedBlogs: SharedBlog[];
    receivedSharedBlogs: SharedBlog[];
}
