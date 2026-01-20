import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './db/db';
import { ConfigModule } from '@nestjs/config';
// import { CoursesController } from './courses/courses.controller';
// import { CoursesService } from './courses/courses.service';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [ ConfigModule.forRoot(),AuthModule, UserModule, DatabaseModule, CoursesModule],
  // controllers: [AppController, CoursesController],
  // providers: [AppService, CoursesService],
})
export class AppModule {}
