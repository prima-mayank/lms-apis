import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/RegisterUserDto';
import bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dto/LoginUserDto';
import { User } from 'src/user/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor( private jwtService: JwtService,
        private UserService: UserService,
      @InjectModel(User.name) private userModel: Model<User>
    ) {}
     async registerUser(RegisterUserDto:RegisterUserDto) {
            const hash=await bcrypt.hash(RegisterUserDto.password,10);
            RegisterUserDto.password=hash;
            const createdUser=await this.UserService.createUser(RegisterUserDto);

            
    const payload =  { sub: createdUser._id, username: createdUser.fname+' '+createdUser.lname };

    const access_token= await this.jwtService.signAsync(payload);
    // console.log(access_token)
    return {
        access_token
    };
    }

    async loginUser(loginUserDto:LoginUserDto) {
        const user=await this.userModel.findOne({email:loginUserDto.email});
        if(!user){
            throw new ConflictException('Invalid credentials');
        }

        const isPasswordValid=await bcrypt.compare(loginUserDto.password,user.password);
        if(!isPasswordValid){
            throw new ConflictException('Invalid credentials');
        }
        const payload =  { sub: user._id, username: user.fname+' '+user.lname };

        const access_token= await this.jwtService.signAsync(payload);
        return {
            access_token
        };
    }

    async getUserById(userId:string) {
      const user=await this.userModel.findById(userId).select('-password');
      if(!user){
        throw new ConflictException('Unauthorized access');
      } 
      return user;
    }
   
}

