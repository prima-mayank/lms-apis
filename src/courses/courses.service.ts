import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/CreateCourseDto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './course.schema';
import { Model } from 'mongoose';
import { find } from 'rxjs';

@Injectable()
export class CoursesService {
    constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}
    async createCourse(createCourseDto: CreateCourseDto) {
       const createdCourse = await this.courseModel.create(createCourseDto);
        return { message: 'Course created successfully', createdCourse };
    }

    async getAllCourses() {
        const allCourses = await this.courseModel.find();
        if (!allCourses || allCourses.length === 0) {
  throw new NotFoundException('No courses found');
}
        return allCourses
    }

    async getCourseById(courseId: string) {
        const course = await this.courseModel.findById(courseId);
        if (!course) {
            throw new NotFoundException('Course with this id is not found');
        }
        return course;
    }

    async deleteCourse(courseId: string) {
        const findCourse = await this.courseModel.findById(courseId);       
        if (!findCourse) {
            throw new NotFoundException('Course with this id is not found');
        }   
        await this.courseModel.findByIdAndDelete(courseId);
        return { deletedCourse: findCourse };
    }
}
