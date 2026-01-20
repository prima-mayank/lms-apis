import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/RegisterUserDto';
import bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/LoginUserDto';

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
}
