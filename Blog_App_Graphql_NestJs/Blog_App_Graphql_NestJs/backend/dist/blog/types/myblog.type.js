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
exports.MyBlogResponse = void 0;
const graphql_1 = require("@nestjs/graphql");
const allblog_type_1 = require("./allblog.type");
let MyBlogResponse = class MyBlogResponse {
};
exports.MyBlogResponse = MyBlogResponse;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MyBlogResponse.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => [allblog_type_1.Blog], { nullable: true }),
    __metadata("design:type", Array)
], MyBlogResponse.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)(() => allblog_type_1.Blog, { nullable: true }),
    __metadata("design:type", allblog_type_1.Blog)
], MyBlogResponse.prototype, "datas", void 0);
exports.MyBlogResponse = MyBlogResponse = __decorate([
    (0, graphql_1.ObjectType)()
], MyBlogResponse);
//# sourceMappingURL=myblog.type.js.map