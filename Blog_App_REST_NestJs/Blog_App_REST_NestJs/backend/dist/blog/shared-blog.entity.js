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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedBlog = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const blog_entity_1 = require("./blog.entity");
let SharedBlog = class SharedBlog {
};
exports.SharedBlog = SharedBlog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SharedBlog.prototype, "share_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => blog_entity_1.Blog, blog => blog.blog_id, { onDelete: 'CASCADE' }),
    __metadata("design:type", blog_entity_1.Blog)
], SharedBlog.prototype, "blog_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.receivedSharedBlogs, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.User)
], SharedBlog.prototype, "shared_with_user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.sentSharedBlogs, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.User)
], SharedBlog.prototype, "sender_id", void 0);
exports.SharedBlog = SharedBlog = __decorate([
    (0, typeorm_1.Entity)('SharedBlogs')
], SharedBlog);
//# sourceMappingURL=shared-blog.entity.js.map