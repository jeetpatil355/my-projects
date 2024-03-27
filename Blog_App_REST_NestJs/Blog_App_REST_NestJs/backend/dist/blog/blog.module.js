"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModule = void 0;
const common_1 = require("@nestjs/common");
const blog_controller_1 = require("./blog.controller");
const blog_service_1 = require("./blog.service");
const typeorm_1 = require("@nestjs/typeorm");
const blog_entity_1 = require("./blog.entity");
const shared_blog_entity_1 = require("./shared-blog.entity");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("../user/user.entity");
const user_service_1 = require("../user/user.service");
let BlogModule = class BlogModule {
};
exports.BlogModule = BlogModule;
exports.BlogModule = BlogModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            typeorm_1.TypeOrmModule.forFeature([blog_entity_1.Blog]),
            typeorm_1.TypeOrmModule.forFeature([shared_blog_entity_1.SharedBlog]),
        ],
        controllers: [blog_controller_1.BlogController],
        providers: [blog_service_1.BlogService, config_1.ConfigService, user_service_1.UserService],
    })
], BlogModule);
//# sourceMappingURL=blog.module.js.map