import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // list the entities in this module
    TypeOrmModule.forFeature([User]),

    // configure JWT for creating tokens
    JwtModule.register({
      global: true,
      secret: '5OWQacPYWUGaufwDJxGnK7DaQKAYjxNQ',
      signOptions: { expiresIn: '10d' },
    }),
  ],
  providers: [UserService, UserResolver],
})
export class UserModule {}
