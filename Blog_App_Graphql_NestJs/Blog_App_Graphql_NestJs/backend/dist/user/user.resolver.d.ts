import { UserService } from './user.service';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    Register(firstName: string, lastName: string, email: string, phone_number: string, password: string): Promise<{
        status: string;
        data: any;
    }>;
    Login(email: string, password: string): Promise<{
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
        data: import("src/user/user.entity").User[];
    }>;
    searchUser(text: string): Promise<{
        status: string;
        data: import("src/user/user.entity").User[];
    }>;
}
