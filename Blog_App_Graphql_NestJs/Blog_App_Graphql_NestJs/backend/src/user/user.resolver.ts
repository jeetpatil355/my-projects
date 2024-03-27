/* eslint-disable prettier/prettier */
import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import {UserResponse} from  "./types/userresponse.type"
import { LoginType } from './types/login.type';
import { ResponseType } from './types/response.type';
import { User } from './types/user.type';
import { MyUserResponse } from './types/myuser.type';

@Resolver('User')
export class UserResolver {
    constructor(private readonly userService: UserService) { }


    @Mutation(() => UserResponse)
    async Register(
        @Args('firstName') firstName: string,
        @Args('lastName') lastName: string,
        @Args('email') email: string,
        @Args('phone_number') phone_number: string,
        @Args('password') password: string,
    ) {
        const result = await this.userService.registerUser(
            firstName,
            lastName,
            email,
            phone_number,
            password,
        );

        return { status: result.status, data: result.data };
    }

    @Mutation(()=> LoginType)
    async Login(
        @Args('email') email: string,
        @Args('password') password: string,
    ){
        return this.userService.loginUser(email, password);
    }


    @Mutation(()=> UserResponse)
    async changePassword(
        @Args('id') id: string,
        @Args('password') password: string,
    ) {
        return this.userService.changePassword(id, password);
    }

    @Mutation(()=> ResponseType)
    async getUserDetails(@Args('id') id: string) {
        return this.userService.getUserDetails(id);
    }

    @Query(()=> UserResponse)
    async getSingleUser(@Args('id') id: string) {
        return this.userService.getSingleUser(id);
    }

    @Mutation(()=>MyUserResponse)
    async getUsers(){
        return this.userService.getUsers();
    }

    @Mutation(()=>MyUserResponse)
    async searchUser(@Args('text') text: string) {
        return this.userService.searchUser(text);
    }
}
