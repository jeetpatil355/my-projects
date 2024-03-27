import { User } from './user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    registerUser(firstName: string, lastName: string, email: string, phone_number: string, password: string): Promise<{
        status: string;
        data: string;
    }>;
    loginUser(email: string, password: string): Promise<{
        status: string;
        data: any;
    }>;
    changePassword(req: any, newPassword: string, confirmPassword: string): Promise<{
        status: string;
        data: string;
    }>;
    getUserDetails(req: any): Promise<{
        status: string;
        data: any;
    }>;
    getSingleUser(id: any): Promise<{
        status: string;
        data: any;
    }>;
    getUsers(): Promise<{
        status: string;
        data: any;
    }>;
    searchUser(text: string): Promise<{
        status: string;
        data: any;
    }>;
    clearAddedUsers(): Promise<{
        status: string;
        data: string;
    }>;
}
