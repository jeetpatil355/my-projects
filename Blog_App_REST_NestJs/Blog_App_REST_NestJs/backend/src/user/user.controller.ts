/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Request,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from './auth.guard';

@Controller('/user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('/register')
    async registerUser(
        @Body('firstName') firstName: string,
        @Body('lastName') lastName: string,
        @Body('email') email: string,
        @Body('phone_number') phone_number: string,
        @Body('password') password: string,
        @Body('confirmPassword') confirmPassword: string,
    ) {
        if (!firstName) {
            return { status: 'error', data: 'Please fill firstName' };
        } else if (!lastName) {
            return { status: 'error', data: 'Please fill lastName' };
        } else if (!email) {
            return { status: 'error', data: 'Please fill email' };
        } else if (!phone_number) {
            return { status: 'error', data: 'Please fill phone number' };
        } else if (!password) {
            return { status: 'error', data: 'Please fill password' };
        } else if (password.length < 8) {
            return { status: 'error', data: 'Password must be of 8 length' };
        } else if (!confirmPassword) {
            return { status: 'error', data: 'Please fill confirm password' };
        } else if (confirmPassword.length < 8) {
            return { status: 'error', data: 'Confirm password must be of 8 length' };
        } else if (password !== confirmPassword) {
            return { status: 'error', data: 'Password & confirm password are not matching' };
        }

        return this.userService.registerUser(firstName, lastName, email, phone_number, password);
    }




@Post('/login')
    async loginUser(
        @Body('email') email: string,
        @Body('password') password: string,
    ){
        if (!email) {
            return { status: 'error', data: 'Please fill email' };
        } else if (!password) {
            return { status: 'error', data: 'Please fill password' };
        }

        return this.userService.loginUser(email, password);
    }

    @Put('/change-password')
    @UseGuards(AuthGuard)
    async changePassword(
        @Request() req: Request,
        @Body('newPassword') newPassword: string,
        @Body('confirmPassword') confirmPassword: string,
    ) {
        if (!newPassword) {
            return { status: 'error', data: 'Please fill new password' };
        } else if (newPassword.length < 8) {
            return { status: 'error', data: 'New password must be of 8 length' };
        } else if (!confirmPassword) {
            return { status: 'error', data: 'Please fill confirm password' };
        } else if (confirmPassword.length < 8) {
            return { status: 'error', data: 'Confirm password must be of 8 length' };
        } else if (newPassword !== confirmPassword) {
            return { status: 'error', data: 'New password & confirm password are not matching' };
        }

        return this.userService.changePassword(req, newPassword, confirmPassword);
    }

    @Get('/get-details')
    @UseGuards(AuthGuard)
    async getUserDetails(@Request() req: Request){
        return this.userService.getUserDetails(req);
    }

    @Get('/get-single-user/:id')
    async getSingleUser(@Param('id') id: number) {

        return this.userService.getSingleUser(id);
    }


    @Get('/get-users')
    async getUsers() {
        return this.userService.getUsers();
    }

    @Get('/search-user/:text')
    async searchUser(@Param('text') text: string) {
        return this.userService.searchUser(text);
    }

}
