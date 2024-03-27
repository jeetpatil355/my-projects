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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async registerUser(firstName, lastName, email, phone_number, password) {
        const userExists = await this.userRepository.findOneBy({ email });
        if (userExists) {
            return { status: 'error', data: 'User Already Exists' };
        }
        const salt = await bcrypt.genSalt(5);
        const encrypedPassword = await bcrypt.hash(password.toString(), salt);
        const user = new user_entity_1.User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.phone_number = phone_number;
        user.password = encrypedPassword;
        await this.userRepository.save(user);
        return { status: 'success', data: 'Registration successful' };
    }
    async loginUser(email, password) {
        try {
            const user = await this.userRepository.findOneBy({
                email
            });
            if (!user) {
                return { status: 'error', data: 'User not found' };
            }
            const isMatch = await bcrypt.compare(password.toString(), user.password);
            if (!isMatch) {
                return { status: 'error', data: 'Invalid Credentials' };
            }
            else {
                const payload = {
                    id: user.id,
                    name: `${user.firstName} ${user.lastName}`,
                };
                const token = this.jwtService.sign(payload);
                return {
                    status: 'success',
                    data: {
                        id: user.id,
                        name: `${user.firstName} ${user.lastName}`,
                        email: user.email,
                        phone: user.phone_number,
                        message: 'Login successful',
                        token,
                    },
                };
            }
        }
        catch (ex) {
            return { status: 'error', data: ex };
        }
    }
    async changePassword(req, newPassword, confirmPassword) {
        const salt = await bcrypt.genSalt(5);
        const encryptedPassword = await bcrypt.hash(confirmPassword.toString(), salt);
        const result = await this.userRepository.update(req.user.id, { password: encryptedPassword });
        if (result.affected !== 0) {
            return { status: 'success', data: 'Password changed successfully' };
        }
        else {
            return { status: 'error', data: 'Error occurred while changing password' };
        }
    }
    async getUserDetails(req) {
        try {
            const result = await this.userRepository.findOneBy({ id: req.user.id });
            console.log("user", result);
            if (result) {
                return { status: 'success', data: result };
            }
            else {
                return { status: 'error', data: 'Error occurred while getting details' };
            }
        }
        catch (error) {
            console.log(error);
            return { status: 'error', data: error.message };
        }
    }
    async getSingleUser(id) {
        try {
            const user = await this.userRepository.findOneBy({ id });
            console.log(user);
            if (user) {
                return { status: 'success', data: `${user.firstName} ${user.lastName}` };
            }
            else {
                return { status: 'error', data: 'Error occurred while getting details' };
            }
        }
        catch (error) {
            console.log(error);
            return { status: 'error', data: error.message };
        }
    }
    async getUsers() {
        try {
            const users = await this.userRepository.find();
            if (users.length) {
                return { status: 'success', data: users };
            }
            else {
                return { status: 'error', data: 'Error occurred while getting users' };
            }
        }
        catch (error) {
            console.log(error);
            return { status: 'error', data: error.message };
        }
    }
    async searchUser(text) {
        try {
            const users = await this.userRepository.createQueryBuilder("user")
                .where("user.firstName LIKE :text OR user.lastName LIKE :text OR user.email LIKE :text", { text: `%${text}%` })
                .getMany();
            return { status: 'success', data: users };
        }
        catch (error) {
            console.log(error);
            return { status: 'error', data: error.message };
        }
    }
    async clearAddedUsers() {
        const clear = await this.userRepository
            .createQueryBuilder()
            .update(user_entity_1.User)
            .set({ is_added: 0 })
            .where('is_added = :isAdded', { isAdded: 1 })
            .execute();
        if (clear) {
            return { status: 'success', data: 'done' };
        }
        else {
            return { status: 'error', data: 'Error Occurred while clearing added user' };
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map