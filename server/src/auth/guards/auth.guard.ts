import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as admin from 'firebase-admin';
import { RequestWithUser } from 'src/utils/types/common';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<RequestWithUser>();
    const authToken = req.headers.authorization;

    if (!authToken || !authToken.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid Bearer Token');
    }

    try {
      const tokenString = authToken.replace('Bearer ', '');
      const decodedToken: admin.auth.DecodedIdToken = await admin
        .auth()
        .verifyIdToken(tokenString);

      console.log(decodedToken);
      const { email, uid, role } = decodedToken;
      req.user = { email, uid, role };

      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(error.message);
    }
  }
}
