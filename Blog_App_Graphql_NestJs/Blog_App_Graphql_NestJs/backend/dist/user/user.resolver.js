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
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_service_1 = require("./user.service");
const userresponse_type_1 = require("./types/userresponse.type");
const login_type_1 = require("./types/login.type");
const response_type_1 = require("./types/response.type");
const myuser_type_1 = require("./types/myuser.type");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    async Register(firstName, lastName, email, phone_number, password) {
        const result = await this.userService.registerUser(firstName, lastName, email, phone_number, password);
        return { status: result.status, data: result.data };
    }
    async Login(email, password) {
        return this.userService.loginUser(email, password);
    }
    async changePassword(id, password) {
        return this.userService.changePassword(id, password);
    }
    async getUserDetails(id) {
        return this.userService.getUserDetails(id);
    }
    async getSingleUser(id) {
        return this.userService.getSingleUser(id);
    }
    async getUsers() {
        return this.userService.getUsers();
    }
    async searchUser(text) {
        return this.userService.searchUser(text);
    }
};
exports.UserResolver = UserResolver;
__decorate([
    (0, graphql_1.Mutation)(() => userresponse_type_1.UserResponse),
    __param(0, (0, graphql_1.Args)('firstName')),
    __param(1, (0, graphql_1.Args)('lastName')),
    __param(2, (0, graphql_1.Args)('email')),
    __param(3, (0, graphql_1.Args)('phone_number')),
    __param(4, (0, graphql_1.Args)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "Register", null);
__decorate([
    (0, graphql_1.Mutation)(() => login_type_1.LoginType),
    __param(0, (0, graphql_1.Args)('email')),
    __param(1, (0, graphql_1.Args)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "Login", null);
__decorate([
    (0, graphql_1.Mutation)(() => userresponse_type_1.UserResponse),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "changePassword", null);
__decorate([
    (0, graphql_1.Mutation)(() => response_type_1.ResponseType),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUserDetails", null);
__decorate([
    (0, graphql_1.Query)(() => userresponse_type_1.UserResponse),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getSingleUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => myuser_type_1.MyUserResponse),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUsers", null);
__decorate([
    (0, graphql_1.Mutation)(() => myuser_type_1.MyUserResponse),
    __param(0, (0, graphql_1.Args)('text')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "searchUser", null);
exports.UserResolver = UserResolver = __decorate([
    (0, graphql_1.Resolver)('User'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
//# sourceMappingURL=user.resolver.js.map