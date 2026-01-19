import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/auth/dto/RegisterUserDto';

@Injectable()
export class UserService {

    createUser(RegisterUserDto:RegisterUserDto) {
        console.log("dto",RegisterUserDto);
        return 'User creation logic hetree';
    }
}
