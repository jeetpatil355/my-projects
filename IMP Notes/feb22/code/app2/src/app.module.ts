import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'notesdb',
      username: 'root',
      password: 'root',
      entities: [__dirname + '/**/*.entity.{ts,js}'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
