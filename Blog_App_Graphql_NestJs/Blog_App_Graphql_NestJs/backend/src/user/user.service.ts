/* eslint-disable prettier/prettier */


import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async registerUser(firstName: string, lastName: string, email: string, phone_number: string, password: string) {
        try {
            const userExists = await this.userRepository.findOneBy({ email });

        if (userExists) {
            return { status: 'error', data: "User already exists" };
        }

        const salt = await bcrypt.genSalt(5);
        const encrypedPassword = await bcrypt.hash(password.toString(), salt);

        const user = new User();
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.phone_number = phone_number
            user.password = encrypedPassword;

            await this.userRepository.save(user);
            return { status: 'success', data: "Registration Successful" };
        } catch (error) {
            console.log(error);
            return { status: 'error', data: error.message };
        }
    }

    async loginUser(email: string, password: string){
        try {
            const user = await this.userRepository.findOneBy({ email });

            if (!user) {
                return { status: 'error', data: 'User not found', token: null };
            }

            const isMatch = await bcrypt.compare(password.toString(), user.password);

            if (!isMatch) {
                return { status: 'error', data: 'Invalid Credentials', token: null };
            } else {
                const payload = {
                    id: user.id,
                    name: `${user.firstName} ${user.lastName}`,
                };

                const token = this.jwtService.sign(payload);

                return {
                    status: 'success',
                    data: "Login successful",
                    token: token,
                    id: user.id
                };
            }
        } catch (error) {
            console.log(error);
            return { status: 'error', data: error.message };
        }
    }

    async changePassword(id: string,password: string){
        try {
            const myId = parseInt(id)
            const salt = await bcrypt.genSalt(5);
            const encryptedPassword = await bcrypt.hash(password.toString(), salt);

            await this.userRepository.update(myId, { password: encryptedPassword });

            return { status: 'success', data: 'Password changed successfully' };
        } catch (error) {
            console.log(error);
            return { status: 'error', data: error.message };
        }
    }

    async getUserDetails(id: string) {
        try {
            const myId = parseInt(id)
            const user = await this.userRepository.findOneBy({id: myId});

            if (user) {
                return { status: 'success', data: "success",firstName:user.firstName ,lastName: user.lastName,email:user.email, phone_number: user.phone_number, created_at:user.created_at };
            } else {
                return { status: 'error', data: null,firstName:null ,lastName: null,email:null, phone_number: null, created_at:null };
            }
        } catch (error) {
            console.log(error);
            return { status: 'error',data: null,firstName:null ,lastName: null,email:null, phone_number: null, created_at:null };
        }
    }

    async getSingleUser(id: string) {
        try {
            const myId = parseInt(id)
            const user = await this.userRepository.findOneBy({id: myId});

            if (user) {
                return { status: 'success', data: `${user.firstName} ${user.lastName}` };
            } else {
                return { status: 'error', data: 'User not found' };
            }
        } catch (error) {
            console.log(error);
            return { status: 'error', data: error.message };
        }
    }

    async getUsers() {
        
            const users = await this.userRepository.find();
            return {status: "success" , data:users};
    }

    async searchUser(text: string) {
        try {
            const users = await this.userRepository
                .createQueryBuilder()
                .select("id, firstName, lastName, email")
                .where('firstName LIKE :text OR lastName LIKE :text OR email LIKE :text', {
                    text: `%${text}%`,
                })
                .getMany();

            return {status: "success" , data:users};
        } catch (error) {
            console.log(error);
            return {status: "error" , data: []};
        }
    }

    async clearAddedUsers(){
        try {
            const clear = await this.userRepository
                .createQueryBuilder()
                .update(User)
                .set({ is_added: 0 })
                .where('is_added = :isAdded', { isAdded: 1 })
                .execute();

            if (clear) {
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log(error);
            return false
        }
    }
}
