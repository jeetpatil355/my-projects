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
exports.BlogResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const blog_service_1 = require("./blog.service");
const user_service_1 = require("../user/user.service");
const blog_type_1 = require("./types/blog.type");
const myblog_type_1 = require("./types/myblog.type");
const blogresponse_type_1 = require("./types/blogresponse.type");
const allblog_type_1 = require("./types/allblog.type");
let BlogResolver = class BlogResolver {
    constructor(blogService, userService) {
        this.blogService = blogService;
        this.userService = userService;
    }
    async uploadImage(image) {
        return this.blogService.uploadImg(image);
    }
    async createBlog(title, content, pic, category, is_private, id) {
        if (!title) {
            throw new Error('Please fill title');
        }
        else if (!content) {
            throw new Error('Please fill content');
        }
        else if (!pic) {
            throw new Error('Please upload image');
        }
        else if (!category || category === "0") {
            throw new Error('Please select category');
        }
        return this.blogService.createBlog(title, content, pic, category, id, is_private);
    }
    async updateBlog(id, title, content, pic, category, is_private) {
        if (!title) {
            throw new Error('Please fill title');
        }
        else if (!content) {
            throw new Error('Please fill content');
        }
        else if (!pic) {
            throw new Error('Please upload image');
        }
        else if (!category || category === "0") {
            throw new Error('Please select category');
        }
        return this.blogService.updateBlog(id, title, content, pic, category, is_private);
    }
    async getBlogsByUserId(id) {
        return this.blogService.getBlogsByUserId(id);
    }
    async markBlogAsPrivate(bid, uid) {
        return this.blogService.markBlogAsPrivate(bid, uid);
    }
    async markBlogAsPublic(bid, uid) {
        return this.blogService.markBlogAsPublic(bid, uid);
    }
    async getPublicBlogs() {
        return this.blogService.getPublicBlogs();
    }
    async getUserByBlogId(id) {
        return this.blogService.getUserByBlogId(id);
    }
    async deleteBlogById(id) {
        return this.blogService.deleteBlogById(id);
    }
    async getBlogById(id) {
        return this.blogService.getBlogById(id);
    }
    async clearAddedUsers() {
        return this.userService.clearAddedUsers();
    }
    async searchBlogsByText(text) {
        return this.blogService.searchBlogsByText(text);
    }
    async searchBlogsByTextForUser(text, id) {
        return this.blogService.searchBlogsByTextForUser(text, id);
    }
    async getSharedBlogsForUser(id) {
        return this.blogService.getSharedBlogsForUser(id);
    }
    async updateIsAddedForSharedUsers(blog_id, id) {
        return this.blogService.updateIsAddedForSharedUsers(blog_id, id);
    }
    async unshareBlog(blog_id, shared_with_user_id, id) {
        return this.blogService.unshareBlog(blog_id, shared_with_user_id, id);
    }
    async shareBlog(blog_id, shared_with_user_id, id) {
        return this.blogService.shareBlog(blog_id, shared_with_user_id, id);
    }
    async searchSharedBlogsByText(text, id) {
        return this.blogService.searchSharedBlogsByText(id, text);
    }
};
exports.BlogResolver = BlogResolver;
__decorate([
    (0, graphql_1.Mutation)(() => blog_type_1.BlogType),
    __param(0, (0, graphql_1.Args)('image')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogResolver.prototype, "uploadImage", null);
__decorate([
    (0, graphql_1.Mutation)(() => blog_type_1.BlogType),
    __param(0, (0, graphql_1.Args)('title')),
    __param(1, (0, graphql_1.Args)('content')),
    __param(2, (0, graphql_1.Args)('pic')),
    __param(3, (0, graphql_1.Args)('category')),
    __param(4, (0, graphql_1.Args)('is_private')),
    __param(5, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Number, String]),
    __metadata("design:returntype", Promise)
], BlogResolver.prototype, "createBlog", null);
__decorate([
    (0, graphql_1.Mutation)(() => blog_type_1.BlogType),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('title')),
    __param(2, (0, graphql_1.Args)('content')),
    __param(3, (0, graphql_1.Args)('pic')),
    __param(4, (0, graphql_1.Args)('category')),
    __param(5, (0, graphql_1.Args)('is_private')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, String, String, Number]),
    __metadata("design:returntype", Promise)
], BlogResolver.prototype, "updateBlog", null);
__decorate([
    (0, graphql_1.Mutation)(() => myblog_type_1.MyBlogResponse),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogResolver.prototype, "getBlogsByUserId", null);
__decorate([
    (0, graphql_1.Mutation)(() => blogresponse_type_1.BlogResponseType),
    __param(0, (0, graphql_1.Args)('bid')),
    __param(1, (0, graphql_1.Args)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], BlogResolver.prototype, "markBlogAsPrivate", null);
__decorate([
    (0, graphql_1.Mutation)(() => blogresponse_type_1.BlogResponseType),
    __param(0, (0, graphql_1.Args)('bid')),
    __param(1, (0, graphql_1.Args)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], BlogResolver.prototype, "markBlogAsPublic", null);
__decorate([
    (0, graphql_1.Mutation)(() => myblog_type_1.MyBlogResponse),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogResolver.prototype, "getPublicBlogs", null);
__decorate([
    (0, graphql_1.Query)(() => blog_type_1.BlogType),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BlogResolver.prototype, "getUserByBlogId", null);
__decorate([
    (0, graphql_1.Mutation)(() => blog_type_1.BlogType),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BlogResolver.prototype, "deleteBlogById", null);
__decorate([
    (0, graphql_1.Mutation)(() => allblog_type_1.Blog),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BlogResolver.prototype, "getBlogById", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogResolver.prototype, "clearAddedUsers", null);
__decorate([
    (0, graphql_1.Mutation)(() => myblog_type_1.MyBlogResponse),
    __param(0, (0, graphql_1.Args)('text')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogResolver.prototype, "searchBlogsByText", null);
__decorate([
    (0, graphql_1.Mutation)(() => myblog_type_1.MyBlogResponse),
    __param(0, (0, graphql_1.Args)('text')),
    __param(1, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], BlogResolver.prototype, "searchBlogsByTextForUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => myblog_type_1.MyBlogResponse),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BlogResolver.prototype, "getSharedBlogsForUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('blog_id')),
    __param(1, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BlogResolver.prototype, "updateIsAddedForSharedUsers", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('blog_id')),
    __param(1, (0, graphql_1.Args)('share_id')),
    __param(2, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], BlogResolver.prototype, "unshareBlog", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('blog_id')),
    __param(1, (0, graphql_1.Args)('share_id')),
    __param(2, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], BlogResolver.prototype, "shareBlog", null);
__decorate([
    (0, graphql_1.Mutation)(() => myblog_type_1.MyBlogResponse),
    __param(0, (0, graphql_1.Args)('text')),
    __param(1, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], BlogResolver.prototype, "searchSharedBlogsByText", null);
exports.BlogResolver = BlogResolver = __decorate([
    (0, graphql_1.Resolver)('Blog'),
    __metadata("design:paramtypes", [blog_service_1.BlogService,
        user_service_1.UserService])
], BlogResolver);
//# sourceMappingURL=blog.resolver.js.map