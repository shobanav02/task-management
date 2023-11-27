import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/task-management'), 
    TasksModule, AuthModule,
   ConfigModule.forRoot({
    envFilePath : [`.env.stage.${process.env.STAGE}`]
   })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
