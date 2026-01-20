import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterUserDto } from 'src/auth/dto/RegisterUserDto';
import { User } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}


    async createUser(RegisterUserDto:RegisterUserDto) {

        const emailExists=await this.userModel.findOne({email:RegisterUserDto.email});
        if(emailExists){
             throw new ConflictException('Email already in use');
        }

        const createdUser = new this.userModel(RegisterUserDto);
        return await createdUser.save();
       
        
    }
}
