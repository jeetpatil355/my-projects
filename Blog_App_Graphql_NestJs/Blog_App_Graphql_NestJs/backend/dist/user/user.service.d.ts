import { User } from "./user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
export declare class UserService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    registerUser(firstName: string, lastName: string, email: string, phone_number: string, password: string): Promise<{
        status: string;
        data: any;
    }>;
    loginUser(email: string, password: string): Promise<{
        status: string;
        data: string;
        token: any;
        id?: undefined;
    } | {
        status: string;
        data: string;
        token: string;
        id: number;
    } | {
        status: string;
        data: any;
        token?: undefined;
        id?: undefined;
    }>;
    changePassword(id: string, password: string): Promise<{
        status: string;
        data: any;
    }>;
    getUserDetails(id: string): Promise<{
        status: string;
        data: string;
        firstName: string;
        lastName: string;
        email: string;
        phone_number: string;
        created_at: Date;
    }>;
    getSingleUser(id: string): Promise<{
        status: string;
        data: any;
    }>;
    getUsers(): Promise<{
        status: string;
        data: User[];
    }>;
    searchUser(text: string): Promise<{
        status: string;
        data: User[];
    }>;
    clearAddedUsers(): Promise<boolean>;
}
