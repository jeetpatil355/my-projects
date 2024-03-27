/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config"
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { Repository } from 'typeorm';
import { v2 as cloudinary } from 'cloudinary';
import { User } from 'src/user/user.entity';
import { SharedBlog } from './shared-blog.entity';

@Injectable()
export class BlogService {
    constructor(
        private readonly configService: ConfigService,

        @InjectRepository(Blog)
        private blogRepository: Repository<Blog>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(SharedBlog)
        private readonly sharedBlogRepository: Repository<SharedBlog>,
    ) {
        cloudinary.config({
            cloud_name: this.configService.get<string>('CLOUD_NAME'),
            api_key: this.configService.get<string>('API_KEY'),
            api_secret: this.configService.get<string>('API_SECRET'),
        });
    }


    async uploadImage(image) {
        try {

            const opts = {
                overwrite: true,
                invalidate: true,
            };

            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload(image, opts, (error, result) => {
                    if (result && result.secure_url) {
                        return resolve(result);
                    }
                    console.log(error.message);
                    return reject({ message: error.message });
                });
            });


            if (result) {
                return { status: 'success', data: { result, message: 'Image uploaded successfully' } };
            } else {
                return { status: 'error', data: "Error Occurred while posting image" };
            }
        } catch (error) {
            console.error(error);
            return { status: 'error', data: error.message };
        }
    }


    async createBlog(title: string, content: string, file_path: string, category_name: string, id, is_private: number) {

        const newBlog = new Blog()
        newBlog.title = title
        newBlog.content = content
        newBlog.file_path = file_path
        newBlog.category_name = category_name
        newBlog.is_private = is_private
        newBlog.user = id

        const blog = await this.blogRepository.save(newBlog);
        if (blog) {
            return { status: 'success', data: "Blog created successfully" }
        } else {
            return { status: 'error', data: "Error Occurred while creating blog" }
        }
    } catch(error) {
        return { status: 'error', data: error.message };
    }


    async updateBlog(id, title: string, content: string, pic: string, category: string, isPrivate: number, request) {

        const blog = await this.blogRepository.findOneBy({ blog_id: id });

        if (!blog) {
            return { status: 'error', data: 'Blog not found or unauthorized' };
        }

        blog.title = title;
        blog.content = content;
        blog.file_path = pic;
        blog.category_name = category;
        blog.is_private = isPrivate;

        await this.blogRepository.save(blog);

        return { status: 'success', data: 'Blog updated successfully' };
    }


    async getBlogsByUserId(userId: number) {
        const blogs = await this.blogRepository.find({
            where: { user: { id: userId } },
            relations: ['user'],
        });
        return { status: 'success', data: blogs };
    }

    async markBlogPrivacy(blogId: number, userId: number, isPrivate: boolean) {
        const privacyStatus = isPrivate ? 1 : 0;
        await this.blogRepository.update({ blog_id: blogId, user: { id: userId } }, { is_private: privacyStatus });
        const message = isPrivate ? 'Marked Private' : 'Marked Public';
        return { status: 'success', data: message };
    }
    

    async getPublicBlogs(): Promise<any> {

        const publicBlogs = await this.blogRepository.find({
            where: { is_private: 0 },
            relations: ['user'],
        });
        return { status: 'success', data: publicBlogs };
    }

    async getUserByBlogId(blogId: number) {
        const blog = await this.blogRepository.findOne({ where: { blog_id: blogId }, relations: ['user'] });

        if (!blog) {
            return { status: 'error', data: 'Blog not found' };
        }

        const { user } = blog;

        return { status: 'success', data: { id: user.id, firstName: user.firstName, lastName: user.lastName } };
    }

    async deleteBlogById(blogId: number) {
        const deleteResult = await this.blogRepository.delete(blogId);

        if (deleteResult.affected !== 0) {
            return { status: 'success', data: 'Blog Deleted Successfully' };

        } else {
            return { status: 'error', data: 'Blog not found or unauthorized' };
        }
    }

    async getBlogById(blogId: number) {
        const blog = await this.blogRepository.findOne({where: { blog_id: blogId }, relations: ['user'] });

        if (!blog) {
            return { status: 'error', data: 'Blog not found' };
        }

        return { status: 'success', data: blog };
    }

    async searchBlogsByText(text: string) {


        const blogs = await this.blogRepository
            .createQueryBuilder('blog')
            .select(['blog', 'user'])
            .leftJoin('blog.user', 'user')
            .where('(title LIKE :text OR content LIKE :text OR category_name LIKE :text)', { text: `%${text}%` })
            .andWhere('blog.is_private = 0')
            .getMany();

        return { status: 'success', data: blogs };
    }


    async searchBlogsByTextForUser(text: string, userId: number) {
        
        const blogs = await this.blogRepository
            .createQueryBuilder('blog')
            .select(['blog', 'user'])
            .leftJoin('blog.user', 'user') 
            .where('(blog.title LIKE :text OR blog.content LIKE :text OR blog.category_name LIKE :text)', { text: `%${text}%` })
            .andWhere('blog.userId = :userId', { userId })
            .getMany();

        return { status: 'success', data: blogs };
    }


    async getSharedBlogsForUser(userId: number) {
        const sharedBlogIds = await this.sharedBlogRepository
            .createQueryBuilder()
            .select('blogIdBlogId')
            .where('sharedWithUserIdId = :userId', { userId })
            .getRawMany();

        const sharedBlogs = await Promise.all(sharedBlogIds.map(async ({ blogIdBlogId }) => {
            console.log(blogIdBlogId)
            const blog = await this.blogRepository.find({
                where: { blog_id: blogIdBlogId },
                relations: ['user'],
            });

            return blog;
        }));


        return { status: 'success', data: sharedBlogs };
    }

    async updateIsAddedForSharedUsers(blogId: number, senderId: number) {
        const sharedUsers = await this.sharedBlogRepository
            .createQueryBuilder()
            .select('sharedWithUserIdId')
            .where('blogIdBlogId = :blogId', { blogId })
            .andWhere('senderIdId = :senderId', { senderId })
            .getRawMany();

        for (const { sharedWithUserIdId } of sharedUsers) {
            await this.userRepository
                .createQueryBuilder()
                .update(User)
                .set({ is_added: 1 })
                .where('id = :userId', { userId: sharedWithUserIdId })
                .execute();
        }

        return { status: 'success', data: 'done' };
    }


    async unshareBlog(blogId: number, sharedWithUserId: number, senderId: number) {
        const share = await this.sharedBlogRepository
            .createQueryBuilder()
            .delete()
            .where('blog_id = :blogId', { blogId })
            .andWhere('shared_with_user_id = :sharedWithUserId', { sharedWithUserId })
            .andWhere('sender_id = :senderId', { senderId })
            .execute();

        const user = await this.userRepository.findOneBy({ id: sharedWithUserId });

        if (share.affected) {
            await this.userRepository
                .createQueryBuilder()
                .update(User)
                .set({ is_added: 0 })
                .where('id = :userId', { userId: sharedWithUserId })
                .execute();

            return {
                status: 'success',
                data: {
                    share,
                    message: `Blog unshared successfully to ${user.firstName} ${user.lastName}`
                }
            };
        } else {
            return { status: 'error', data: 'Error Occurred while unsharing blog' };
        }
    }

    async shareBlog(blogId, sharedWithUserId, senderId) {
        const share = await this.sharedBlogRepository
            .createQueryBuilder()
            .insert()
            .into(SharedBlog)
            .values({ blog_id: blogId, shared_with_user_id: sharedWithUserId, sender_id: senderId })
            .execute();

        const user = await this.userRepository.findOneBy({ id: sharedWithUserId });

        if (share.identifiers && share.identifiers.length > 0) {
            await this.userRepository
                .createQueryBuilder()
                .update(User)
                .set({ is_added: 1 })
                .where('id = :userId', { userId: sharedWithUserId })
                .execute();

            return {
                status: 'success',
                data: {
                    share,
                    message: `Blog shared successfully to ${user.firstName} ${user.lastName}`
                }
            };
        } else {
            return { status: 'error', data: 'Error Occurred while sharing blog' };
        }
    }

    async searchSharedBlogsByText(userId: number, searchText: string): Promise<any> {
        const blogIds = await this.sharedBlogRepository
            .createQueryBuilder()
            .select('blogIdBlogId, senderIdId')
            .where('sharedWithUserIdId = :userId', { userId })
            .getRawMany();

        const blogs = [];
        

        for (const { blogIdBlogId, senderIdId } of blogIds) {
            const res = await this.blogRepository
                .createQueryBuilder('blog')
                .select(['blog', 'user'])
                .leftJoin('blog.user', 'user')
                .where('(blog.title LIKE :text OR blog.category_name LIKE :text)', { text: `%${searchText}%` })
                .andWhere('blog.userId = :senderId', { senderId: senderIdId })
                .andWhere('blog.blog_id = :blogId', { blogId: blogIdBlogId })
                .getMany();
        
            if (res.length > 0) {
                blogs.push(res[0]);
            }
        }

        return blogs;
    }
}
