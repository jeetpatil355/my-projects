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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
let AuthGuard = class AuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(jwtService) {
        super();
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const { req } = ctx.getContext();
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error('Authorization header is missing or invalid');
        }
        const token = authHeader.split(' ')[1];
        try {
            const decoded = this.jwtService.verify(token);
            req['decodedToken'] = decoded;
            return true;
        }
        catch (error) {
            throw new Error('Invalid token');
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map