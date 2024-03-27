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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const auth_guard_1 = require("./auth.guard");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async registerUser(firstName, lastName, email, phone_number, password, confirmPassword) {
        if (!firstName) {
            return { status: 'error', data: 'Please fill firstName' };
        }
        else if (!lastName) {
            return { status: 'error', data: 'Please fill lastName' };
        }
        else if (!email) {
            return { status: 'error', data: 'Please fill email' };
        }
        else if (!phone_number) {
            return { status: 'error', data: 'Please fill phone number' };
        }
        else if (!password) {
            return { status: 'error', data: 'Please fill password' };
        }
        else if (password.length < 8) {
            return { status: 'error', data: 'Password must be of 8 length' };
        }
        else if (!confirmPassword) {
            return { status: 'error', data: 'Please fill confirm password' };
        }
        else if (confirmPassword.length < 8) {
            return { status: 'error', data: 'Confirm password must be of 8 length' };
        }
        else if (password !== confirmPassword) {
            return { status: 'error', data: 'Password & confirm password are not matching' };
        }
        return this.userService.registerUser(firstName, lastName, email, phone_number, password);
    }
    async loginUser(email, password) {
        if (!email) {
            return { status: 'error', data: 'Please fill email' };
        }
        else if (!password) {
            return { status: 'error', data: 'Please fill password' };
        }
        return this.userService.loginUser(email, password);
    }
    async changePassword(req, newPassword, confirmPassword) {
        if (!newPassword) {
            return { status: 'error', data: 'Please fill new password' };
        }
        else if (newPassword.length < 8) {
            return { status: 'error', data: 'New password must be of 8 length' };
        }
        else if (!confirmPassword) {
            return { status: 'error', data: 'Please fill confirm password' };
        }
        else if (confirmPassword.length < 8) {
            return { status: 'error', data: 'Confirm password must be of 8 length' };
        }
        else if (newPassword !== confirmPassword) {
            return { status: 'error', data: 'New password & confirm password are not matching' };
        }
        return this.userService.changePassword(req, newPassword, confirmPassword);
    }
    async getUserDetails(req) {
        return this.userService.getUserDetails(req);
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
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)('firstName')),
    __param(1, (0, common_1.Body)('lastName')),
    __param(2, (0, common_1.Body)('email')),
    __param(3, (0, common_1.Body)('phone_number')),
    __param(4, (0, common_1.Body)('password')),
    __param(5, (0, common_1.Body)('confirmPassword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registerUser", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "loginUser", null);
__decorate([
    (0, common_1.Put)('/change-password'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)('newPassword')),
    __param(2, (0, common_1.Body)('confirmPassword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Get)('/get-details'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserDetails", null);
__decorate([
    (0, common_1.Get)('/get-single-user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getSingleUser", null);
__decorate([
    (0, common_1.Get)('/get-users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('/search-user/:text'),
    __param(0, (0, common_1.Param)('text')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "searchUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('/user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map