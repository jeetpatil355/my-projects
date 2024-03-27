import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Blog } from '../blog/blog.entity';
import { SharedBlog } from '../blog/shared-blog.entity';

@Entity("user")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    phone_number: string;

    @Column()
    password: string;

    @Column({ default: 0 })
    is_added: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @OneToMany(() => Blog, blog => blog.user)
    blogs: Blog[];

    @OneToMany(() => SharedBlog, sharedBlog => sharedBlog.sender_id)
    sentSharedBlogs: SharedBlog[];

    @OneToMany(() => SharedBlog, sharedBlog => sharedBlog.shared_with_user_id)
    receivedSharedBlogs: SharedBlog[];
}