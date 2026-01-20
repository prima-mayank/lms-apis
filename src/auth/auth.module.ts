import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from 'src/user/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  UserModule, JwtModule.register({
    secret: process.env.JWT_SECRET || 'defaultSecretKey',
    signOptions: { expiresIn: '1h' },
  })],
  controllers: [AuthController],
  providers: [AuthService,AuthGuard],
   exports: [
    JwtModule,
    AuthGuard,   
  ],
})
export class AuthModule {}
