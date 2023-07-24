import { Request } from 'express';

export enum ROLES {
  ADMIN = 'admin',
  USER = 'user',
}

export interface RequestWithUser extends Request {
  user: any; // admin.auth.DecodedIdToken
}
