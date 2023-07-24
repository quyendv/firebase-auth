import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequestWithUser } from 'src/utils/types/common';
import { KEY_ROLES } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(KEY_ROLES, context.getHandler()); // update by boilerplate
    if (!roles) return true;

    console.log('RolesGuard', roles);
    const request = context.switchToHttp().getRequest<RequestWithUser>(); // fix RequestWithUser
    const user = request.user;
    console.log(user);
    const hasRole = () => roles.includes(user.role);
    console.log('conditions', user && user.role && hasRole());
    return user && user.role && hasRole();
  }
}
