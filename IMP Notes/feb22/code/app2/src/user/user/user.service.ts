import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

// load the cryptoJs
const cryptoJs = require('crypto-js');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,

    private jwtService: JwtService,
  ) {}

  async createUser(
    firstName: String,
    lastName: String,
    email: String,
    password: String,
  ) {
    try {
      // encrypt the password
      const encryptedPassword = String(cryptoJs.SHA256(password.toString()));

      // create a row by creating an object of entity class
      const user = new User();
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.password = encryptedPassword;
      await this.repository.save(user);
      return { status: 'success', data: 'done' };
    } catch (ex) {
      console.log(ex);
      return { status: 'error', error: ex };
    }
  }

  async login(email: String, password: String) {
    try {
      // encrypt the password
      const encryptedPassword = String(cryptoJs.SHA256(password.toString()));

      // find the entities
      const user = await this.repository.findOneBy({
        email,
        password: encryptedPassword,
      });

      if (!user) {
        return { status: 'error', error: 'user does not exist' };
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
          data: { token, name: `${user.firstName} ${user.lastName}` },
        };
      }
    } catch (ex) {
      return { status: 'error', error: ex };
    }
  }

  async getProfile(id: Number) {
    const user = await this.repository.findOneBy({ id });
    if (!user) {
      return { status: 'error', error: 'user does not exist' };
    }

    // delete user id and password
    delete user.id;
    delete user.password;
    return { status: 'success', data: user };
  }
}
