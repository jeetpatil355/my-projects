/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async registerUser(firstName: string, lastName: string, email: string, phone_number: string, password: string) {
        const userExists = await this.userRepository.findOneBy({ email });

        if (userExists) {
            return { status: 'error', data: 'User Already Exists' };
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
            return { status: 'success', data: 'Registration successful' };
    }


    async loginUser(email: string, password: string) {
        try {
            // find the entities
            const user = await this.userRepository.findOneBy({
                email
            });

            if (!user) {
                return { status: 'error', data: 'User not found' };
            }

            const isMatch = await bcrypt.compare(password.toString(), user.password);

            if (!isMatch) {
                return { status: 'error', data: 'Invalid Credentials' };
            } else {
                // define the payload
                const payload = {
                    id: user.id,
                    name: `${user.firstName} ${user.lastName}`,
                };

                // create a token
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
        } catch (ex) {
            return { status: 'error', data: ex };
        }
    }

    async changePassword(req, newPassword: string, confirmPassword: string){

        const salt = await bcrypt.genSalt(5);
        const encryptedPassword = await bcrypt.hash(confirmPassword.toString(), salt);

        const result = await this.userRepository.update(req.user.id, { password: encryptedPassword });

        if (result.affected !== 0) {
            return { status: 'success', data: 'Password changed successfully' };
        } else {
            return { status: 'error', data: 'Error occurred while changing password' };
        }
    }

    async getUserDetails(req) {
        try {
            const result = await this.userRepository.findOneBy({id: req.user.id});
            console.log("user",result)
            if (result) {
                return { status: 'success', data: result };
            } else {
                return { status: 'error', data: 'Error occurred while getting details' };
            }
        } catch (error) {
            console.log(error);
            return { status: 'error', data: error.message };
        }
    }

    async getSingleUser(id) {
        try {
            const user = await this.userRepository.findOneBy({id});

            console.log(user)

            if (user) {
                return { status: 'success', data: `${user.firstName} ${user.lastName}` };
            } else {
                return { status: 'error', data: 'Error occurred while getting details' };
            }
        } catch (error) {
            console.log(error);
            return { status: 'error', data: error.message };
        }
    }


    async getUsers(){
        try {
            const users = await this.userRepository.find();

            if (users.length) {
                return { status: 'success', data: users };
            } else {
                return { status: 'error', data: 'Error occurred while getting users' };
            }
        } catch (error) {
            console.log(error);
            return { status: 'error', data: error.message };
        }
    }


    async searchUser(text: string) {
        try {
            const users = await this.userRepository.createQueryBuilder("user")
                .where("user.firstName LIKE :text OR user.lastName LIKE :text OR user.email LIKE :text", { text: `%${text}%` })
                .getMany();

            return { status: 'success', data: users };
        } catch (error) {
            console.log(error);
            return { status: 'error', data: error.message };
        }
    }


    async clearAddedUsers(){
        const clear = await this.userRepository
            .createQueryBuilder()
            .update(User)
            .set({ is_added: 0 })
            .where('is_added = :isAdded', { isAdded: 1 })
            .execute();

        if (clear) {
            return { status: 'success', data: 'done' };
        } else {
            return { status: 'error', data: 'Error Occurred while clearing added user' };
        }
    }

}
