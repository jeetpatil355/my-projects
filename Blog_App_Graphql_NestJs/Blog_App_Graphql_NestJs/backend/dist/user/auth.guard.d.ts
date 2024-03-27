import { ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
declare const AuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class AuthGuard extends AuthGuard_base {
    private jwtService;
    constructor(jwtService: JwtService);
    canActivate(context: ExecutionContext): boolean;
}
export {};
