import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/RegisterUserDto';
import bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {

   constructor(private readonly UserService: UserService){}

    @Post('register')
    async register(@Body() RegisterUserDto:RegisterUserDto) {

        const hash=await bcrypt.hash(RegisterUserDto.password,10);
        RegisterUserDto.password=hash;
        return this.UserService.createUser(RegisterUserDto);
    }
}
