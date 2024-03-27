import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigAppModule } from './config/config.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule, 
    BlogModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'myblog',
      username: 'root',
      password: 'root',
      synchronize: true,
      entities: [__dirname + '/**/*.entity.{ts,js}'],
    }),
    ConfigAppModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
