import { SetMetadata } from '@nestjs/common';

export const KEY_ROLES = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(KEY_ROLES, roles);
