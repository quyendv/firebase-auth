import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as admin from 'firebase-admin';
import { createUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  @Post()
  async createUser(@Req() req: Request, @Body() userDto: createUserDto) {
    const { displayName, password, email, role } = userDto;
    try {
      // Tạo user trong firebase authentication
      const { uid } = await admin.auth().createUser({
        displayName,
        password,
        email,
      });

      // Thiết lập quyền tùy chỉnh (custom claims) trong firebase authentication, dùng để quản lý authorization (admin, member, moderator, ...)
      await admin.auth().setCustomUserClaims(uid, { role });

      // const idToken = await admin.auth().createCustomToken(uid);
      // console.log(idToken);
      return { uid };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
