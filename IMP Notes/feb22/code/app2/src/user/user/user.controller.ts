import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from './auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  registerUser(
    @Body('firstName') firstName: String,
    @Body('lastName') lastName: String,
    @Body('email') email: String,
    @Body('password') password: String,
  ) {
    return this.userService.createUser(firstName, lastName, email, password);
  }

  @Post('/login')
  loginUser(@Body('email') email: String, @Body('password') password: String) {
    return this.userService.login(email, password);
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  getProfile(@Request() request) {
    const userId = request['user'].id;
    return this.userService.getProfile(userId);
  }
}
