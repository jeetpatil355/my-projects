"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const blog_entity_1 = require("./blog.entity");
const typeorm_2 = require("typeorm");
const cloudinary_1 = require("cloudinary");
const user_entity_1 = require("../user/user.entity");
const shared_blog_entity_1 = require("./shared-blog.entity");
let BlogService = class BlogService {
    constructor(configService, blogRepository, userRepository, sharedBlogRepository) {
        this.configService = configService;
        this.blogRepository = blogRepository;
        this.userRepository = userRepository;
        this.sharedBlogRepository = sharedBlogRepository;
        cloudinary_1.v2.config({
            cloud_name: this.configService.get('CLOUD_NAME'),
            api_key: this.configService.get('API_KEY'),
            api_secret: this.configService.get('API_SECRET'),
        });
    }
    async uploadImg(image) {
        try {
            const opts = {
                overwrite: true,
                invalidate: true,
            };
            const result = await new Promise((resolve, reject) => {
                cloudinary_1.v2.uploader.upload(image, opts, (error, result) => {
                    if (result && result.secure_url) {
                        return resolve(result.secure_url);
                    }
                    console.log(error.message);
                    return reject({ message: error.message });
                });
            });
            if (result) {
                return { status: 'success', data: result, message: 'Image uploaded successfully' };
            }
            else {
                return { status: 'error', data: "Error Occurred while posting image" };
            }
        }
        catch (error) {
            console.error(error);
            return { status: 'error', data: error.message };
        }
    }
    async createBlog(title, content, file_path, category_name, id, is_private) {
        const newBlog = new blog_entity_1.Blog();
        newBlog.title = title;
        newBlog.content = content;
        newBlog.file_path = file_path;
        newBlog.category_name = category_name;
        newBlog.is_private = is_private;
        newBlog.user = parseInt(id);
        const blog = await this.blogRepository.save(newBlog);
        if (blog) {
            return { status: 'success', data: "Blog created successfully" };
        }
        else {
            return { status: 'error', data: "Error Occurred while creating blog" };
        }
    }
    catch(error) {
        return { status: 'error', data: error.message };
    }
    async updateBlog(id, title, content, pic, category, isPrivate) {
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
    async getBlogsByUserId(myId) {
        const userId = parseInt(myId);
        const blogs = await this.blogRepository.createQueryBuilder()
            .select('blog_id,category_name,content,file_path,is_private,publish_date,title, userId')
            .where('userId = :userId', { userId })
            .getRawMany();
        console.log(blogs);
        return { status: 'success', data: blogs };
    }
    async markBlogAsPrivate(blogId, userId) {
        await this.blogRepository.update({ blog_id: blogId, user: parseInt(userId) }, { is_private: 1 });
        return { status: 'success', data: 'Marked Private' };
    }
    async markBlogAsPublic(blogId, userId) {
        await this.blogRepository.update({ blog_id: blogId, user: parseInt(userId) }, { is_private: 0 });
        return { status: 'success', data: 'Marked Public' };
    }
    async getPublicBlogs() {
        const publicBlogs = await this.blogRepository.find({
            where: { is_private: 0 },
        });
        return { status: 'success', data: publicBlogs };
    }
    async getUserByBlogId(blogId) {
        const blog = await this.blogRepository.findOne({ where: { blog_id: blogId }, relations: ['user'] });
        if (!blog) {
            return { status: 'error', data: 'Blog not found' };
        }
        const { user } = blog;
        return { status: 'success', data: { id: user } };
    }
    async deleteBlogById(blogId) {
        const deleteResult = await this.blogRepository.delete(blogId);
        if (deleteResult.affected !== 0) {
            return { status: 'success', data: 'Blog Deleted Successfully' };
        }
        else {
            return { status: 'error', data: 'Blog not found or unauthorized' };
        }
    }
    async getBlogById(blogId) {
        const blog = await this.blogRepository.findOne({ where: { blog_id: blogId } });
        console.log(blog);
        return {
            blog_id: blog.blog_id,
            title: blog.title,
            content: blog.content,
            file_path: blog.file_path,
            category_name: blog.category_name,
            is_private: blog.is_private,
            publish_date: blog.publish_date
        };
    }
    async searchBlogsByText(text) {
        const blogs = await this.blogRepository
            .createQueryBuilder()
            .select('blog_id,category_name,content,file_path,is_private,publish_date,title, userId')
            .where('(title LIKE :text OR content LIKE :text OR category_name LIKE :text)', { text: `%${text}%` })
            .andWhere('is_private = 0')
            .getMany();
        return { status: 'success', data: blogs };
    }
    async searchBlogsByTextForUser(text, userId) {
        const blogs = await this.blogRepository
            .createQueryBuilder()
            .select('blog_id,category_name,content,file_path,is_private,publish_date,title, userId')
            .where('(title LIKE :text OR content LIKE :text OR category_name LIKE :text)', { text: `%${text}%` })
            .andWhere('userId = :userId', { userId })
            .getMany();
        return { status: 'success', data: blogs };
    }
    async getSharedBlogsForUser(userId) {
        const sharedBlogIds = await this.sharedBlogRepository
            .createQueryBuilder()
            .select('blogIdBlogId')
            .where('sharedWithUserIdId = :userId', { userId })
            .getRawMany();
        const sharedBlogs = await Promise.all(sharedBlogIds.map(async ({ blogIdBlogId }) => {
            console.log(blogIdBlogId);
            const blog = await this.blogRepository.createQueryBuilder()
                .select('blog_id, category_name, content, file_path, is_private, publish_date, title, userId')
                .where('blog_id = :blogIdBlogId', { blogIdBlogId })
                .getRawOne();
            return blog;
        }));
        return { status: 'success', data: sharedBlogs };
    }
    async updateIsAddedForSharedUsers(blogId, senderId) {
        const sharedUsers = await this.sharedBlogRepository
            .createQueryBuilder()
            .select('sharedWithUserIdId')
            .where('blogIdBlogId = :blogId', { blogId })
            .andWhere('senderIdId = :senderId', { senderId })
            .getRawMany();
        for (const { sharedWithUserIdId } of sharedUsers) {
            await this.userRepository
                .createQueryBuilder()
                .update(user_entity_1.User)
                .set({ is_added: 1 })
                .where('id = :userId', { userId: sharedWithUserIdId })
                .execute();
        }
        return true;
    }
    async unshareBlog(blogId, sharedWithUserId, senderId) {
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
                .update(user_entity_1.User)
                .set({ is_added: 0 })
                .where('id = :userId', { userId: sharedWithUserId })
                .execute();
            return true;
        }
        else {
            return false;
        }
    }
    async shareBlog(blogId, sharedWithUserId, senderId) {
        const share = await this.sharedBlogRepository
            .createQueryBuilder()
            .insert()
            .into(shared_blog_entity_1.SharedBlog)
            .values({ blog_id: blogId, shared_with_user_id: sharedWithUserId, sender_id: senderId })
            .execute();
        const user = await this.userRepository.findOneBy({ id: sharedWithUserId });
        if (share.identifiers && share.identifiers.length > 0) {
            await this.userRepository
                .createQueryBuilder()
                .update(user_entity_1.User)
                .set({ is_added: 1 })
                .where('id = :userId', { userId: sharedWithUserId })
                .execute();
            return true;
        }
        else {
            return false;
        }
    }
    async searchSharedBlogsByText(userId, searchText) {
        const blogIds = await this.sharedBlogRepository
            .createQueryBuilder()
            .select('blogIdBlogId, senderIdId')
            .where('sharedWithUserIdId = :userId', { userId })
            .getRawMany();
        const blogs = [];
        for (const { blogIdBlogId, senderIdId } of blogIds) {
            const res = await this.blogRepository
                .createQueryBuilder()
                .select('blog_id,category_name,content,file_path,is_private,publish_date,title, userId')
                .where('(title LIKE :text OR category_name LIKE :text)', { text: `%${searchText}%` })
                .andWhere('userId = :senderId', { senderId: senderIdId })
                .andWhere('blog_id = :blogId', { blogId: blogIdBlogId })
                .getMany();
            if (res.length > 0) {
                blogs.push(res[0]);
            }
        }
        return { status: 'success', data: blogs };
    }
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(blog_entity_1.Blog)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(shared_blog_entity_1.SharedBlog)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BlogService);
//# sourceMappingURL=blog.service.js.map