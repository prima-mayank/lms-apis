import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course, CourseSchema } from './course.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),AuthModule],
    controllers: [CoursesController],
    providers: [CoursesService],
    exports: [],
})
export class CoursesModule {}
