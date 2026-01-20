import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/CreateCourseDto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/user/user.types';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    
    @Post()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    async createCourse(@Body() createCourseDto:CreateCourseDto) {
        return this.coursesService.createCourse(createCourseDto);
    }

    @Get()
    async getCourses() {
        return this.coursesService.getAllCourses(); 
    }

    @Get(':id')
    async getCourseById(@Param('id') courseId: string) {
        return this.coursesService.getCourseById(courseId);
    }
    


}
