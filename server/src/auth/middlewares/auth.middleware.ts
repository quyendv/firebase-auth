import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { RequestWithUser } from 'src/utils/types/common';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  public async use(req: RequestWithUser, _: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
      throw new BadRequestException('Missing Authz Header');
    }

    try {
      const user = await this.authService.authenticate(token);
      console.log(user);
      req.user = user;
      next();
    } catch (error) {
      throw error;
    }
  }
}
