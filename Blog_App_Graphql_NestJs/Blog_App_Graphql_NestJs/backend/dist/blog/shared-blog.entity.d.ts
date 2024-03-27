import { User } from '../user/user.entity';
import { Blog } from './blog.entity';
export declare class SharedBlog {
    share_id: number;
    blog_id: Blog;
    shared_with_user_id: User;
    sender_id: User;
}
