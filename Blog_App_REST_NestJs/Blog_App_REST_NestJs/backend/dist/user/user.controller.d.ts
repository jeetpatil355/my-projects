import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    registerUser(firstName: string, lastName: string, email: string, phone_number: string, password: string, confirmPassword: string): Promise<{
        status: string;
        data: string;
    }>;
    loginUser(email: string, password: string): Promise<{
        status: string;
        data: any;
    }>;
    changePassword(req: Request, newPassword: string, confirmPassword: string): Promise<{
        status: string;
        data: string;
    }>;
    getUserDetails(req: Request): Promise<{
        status: string;
        data: any;
    }>;
    getSingleUser(id: number): Promise<{
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
}
