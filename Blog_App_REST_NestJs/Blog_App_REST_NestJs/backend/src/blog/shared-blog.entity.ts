import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Blog } from './blog.entity';

@Entity('SharedBlogs')
export class SharedBlog {
    @PrimaryGeneratedColumn()
    share_id: number;

    @ManyToOne(() => Blog, blog => blog.blog_id,{ onDelete: 'CASCADE' })
    blog_id: Blog;

    @ManyToOne(() => User, user => user.receivedSharedBlogs,{ onDelete: 'CASCADE' })
    shared_with_user_id: User;

    @ManyToOne(() => User, user => user.sentSharedBlogs, { onDelete: 'CASCADE' })
    sender_id: User;
}
