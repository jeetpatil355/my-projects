import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // list the entities in this module
    TypeOrmModule.forFeature([User]),

    // configure JWT for creating tokens
    JwtModule.register({
      global: true,
      secret: '5OWQacPYWUGaufwDJxGnK7DaQKAYjxNQ',
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
