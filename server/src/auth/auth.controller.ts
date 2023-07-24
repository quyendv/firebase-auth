import {
  BadRequestException,
  Controller,
  Get,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('authenticate')
  async authenticate(@Req() req: Request) {
    const authToken = req.headers.authorization;
    if (!authToken) throw new BadRequestException('Missing Auth Token');

    try {
      const { uid, email, role } = await this.authService.authenticate(
        authToken,
      );
      return { uid, email, role };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(error.message);
    }
  }
}
