import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

import { RegisterUserDto } from './dto/RegisterUserDto';

import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/LoginUserDto';
import { AuthGuard } from './auth.guard'

@Controller('auth')
export class AuthController {

   constructor(private readonly AuthService: AuthService){}

    @Post('register')
    async registerUser(@Body() RegisterUserDto:RegisterUserDto) {
        return this.AuthService.registerUser(RegisterUserDto);
    }

    @Post('login')
    async loginUser(@Body() loginUserDto:LoginUserDto) {
        return this.AuthService.loginUser(loginUserDto);
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    async getProfile(@Request() req) {
        const userId=req.user.sub;
        const user= await this.AuthService.getUserById(userId);
        return user;
    }
}
