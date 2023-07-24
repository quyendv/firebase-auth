import { SetMetadata, createParamDecorator } from '@nestjs/common';

export const KEY_AUTH = 'auth';
export const Auth = () => SetMetadata(KEY_AUTH, true);

export const AuthDecorator = createParamDecorator((data, req) => req.user); // Tương đương RequestWithUser

/**
 * Usage example:
 *
 * @Get()
 * @UseGuards(AuthGuard)
 * getAll(@AuthDecorator() user: any) {
 *   // Ở đây, user chứa thông tin người dùng đã xác thực (nếu cần)
 *   console.log(user);
 *   return this.userService.getAll();
 * }
 */
