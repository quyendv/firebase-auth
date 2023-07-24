import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  private getToken(authToken: string): string {
    const match = authToken.match(/^Bearer (.*)$/);
    if (!match || match.length < 2) {
      throw new UnauthorizedException('Invalid Bearer Token');
    }
    return match[1];
  }

  public async authenticate(authToken: string): Promise<any> {
    const tokenString = this.getToken(authToken);
    try {
      const decodedToken: admin.auth.DecodedIdToken = await admin
        .auth()
        .verifyIdToken(tokenString);
      console.log(decodedToken);
      const { email, uid, role } = decodedToken;
      return { email, uid, role };
    } catch (error) {
      console.log(error.message);
      throw new UnauthorizedException(error.message);
    }
  }
}
