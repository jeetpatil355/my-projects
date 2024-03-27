import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity("Blogs")
export class Blog {
    @PrimaryGeneratedColumn()
    blog_id: number;

    @Column()
    title: string;

    @Column('text')
    content: string;

    @Column()
    file_path: string;

    @Column()
    category_name: string;

    @Column({ default: 0 })
    is_private: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    publish_date: Date;

    @ManyToOne(() => User, user => user.blogs,{ onDelete: 'CASCADE' })
    user: User;
}
