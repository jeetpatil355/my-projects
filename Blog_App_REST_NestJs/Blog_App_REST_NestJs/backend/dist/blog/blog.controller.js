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
exports.BlogController = void 0;
const common_1 = require("@nestjs/common");
const blog_service_1 = require("./blog.service");
const auth_guard_1 = require("./auth.guard");
const user_service_1 = require("../user/user.service");
let BlogController = class BlogController {
    constructor(blogService, userService) {
        this.blogService = blogService;
        this.userService = userService;
    }
    async uploadImage(image) {
        return this.blogService.uploadImage(image);
    }
    async createBlog(title, content, pic, category, is_private, request) {
        if (!title) {
            return { status: 'error', data: 'Please fill title' };
        }
        else if (!content) {
            return { status: 'error', data: 'Please fill content' };
        }
        else if (!pic) {
            return { status: 'error', data: 'Please upload image' };
        }
        else if (!category || category === "0") {
            return { status: 'error', data: 'Please select category' };
        }
        return this.blogService.createBlog(title, content, pic, category, request.user.id, is_private);
    }
    async updateBlog(id, title, content, pic, category, is_private, request) {
        if (!title) {
            return { status: 'error', data: 'Please fill title' };
        }
        else if (!content) {
            return { status: 'error', data: 'Please fill content' };
        }
        else if (!pic) {
            return { status: 'error', data: 'Please upload image' };
        }
        else if (!category || category === "0") {
            return { status: 'error', data: 'Please select category' };
        }
        return this.blogService.updateBlog(id, title, content, pic, category, is_private, request);
    }
    async getBlogsByUserId(request) {
        return this.blogService.getBlogsByUserId(request.user.id);
    }
    async markBlogAsPrivate(id, request) {
        return this.blogService.markBlogAsPrivate(id, request.user.id);
    }
    async markBlogAsPublic(id, request) {
        return this.blogService.markBlogAsPublic(id, request.user.id);
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
    async searchBlogsByTextForUser(text, request) {
        return this.blogService.searchBlogsByTextForUser(text, request.user.id);
    }
    async getSharedBlogsForUser(request) {
        return this.blogService.getSharedBlogsForUser(request.user.id);
    }
    async updateIsAddedForSharedUsers(request, { blog_id }) {
        return this.blogService.updateIsAddedForSharedUsers(blog_id, request.user.id);
    }
    async unshareBlog(request, { blog_id, shared_with_user_id }) {
        return this.blogService.unshareBlog(blog_id, shared_with_user_id, request.user.id);
    }
    async shareBlog(request, { blog_id, shared_with_user_id }) {
        return this.blogService.shareBlog(blog_id, shared_with_user_id, request.user.id);
    }
    async searchSharedBlogsByText(request, searchText) {
        return this.blogService.searchSharedBlogsByText(request.user.id, searchText);
    }
};
exports.BlogController = BlogController;
__decorate([
    (0, common_1.Post)('/uploadImage'),
    __param(0, (0, common_1.Body)('image')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('/create-blog'),
    __param(0, (0, common_1.Body)('title')),
    __param(1, (0, common_1.Body)('content')),
    __param(2, (0, common_1.Body)('pic')),
    __param(3, (0, common_1.Body)('category')),
    __param(4, (0, common_1.Body)('is_private')),
    __param(5, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Number, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "createBlog", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)('/update-blog/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('title')),
    __param(2, (0, common_1.Body)('content')),
    __param(3, (0, common_1.Body)('pic')),
    __param(4, (0, common_1.Body)('category')),
    __param(5, (0, common_1.Body)('is_private')),
    __param(6, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, Number, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "updateBlog", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('/get-blogs'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getBlogsByUserId", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Patch)('/private/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "markBlogAsPrivate", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Patch)('/public/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "markBlogAsPublic", null);
__decorate([
    (0, common_1.Get)('/public'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getPublicBlogs", null);
__decorate([
    (0, common_1.Get)('/get-user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getUserByBlogId", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "deleteBlogById", null);
__decorate([
    (0, common_1.Get)('/get-one-blog/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getBlogById", null);
__decorate([
    (0, common_1.Put)('/clear-all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "clearAddedUsers", null);
__decorate([
    (0, common_1.Get)('/search/:text'),
    __param(0, (0, common_1.Param)('text')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "searchBlogsByText", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('/my-search/:text'),
    __param(0, (0, common_1.Param)('text')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "searchBlogsByTextForUser", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('/shared'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getSharedBlogsForUser", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)('/update-add-user'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "updateIsAddedForSharedUsers", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('/unshared'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "unshareBlog", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('/share-blog'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "shareBlog", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('/shared-search/:text'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('text')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "searchSharedBlogsByText", null);
exports.BlogController = BlogController = __decorate([
    (0, common_1.Controller)('/blog'),
    __metadata("design:paramtypes", [blog_service_1.BlogService,
        user_service_1.UserService])
], BlogController);
//# sourceMappingURL=blog.controller.js.map