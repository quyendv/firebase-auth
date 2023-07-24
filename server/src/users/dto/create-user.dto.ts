import { IsEmail, IsString, MinLength } from 'class-validator';

export class createUserDto {
  @IsString()
  @MinLength(4)
  displayName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @MinLength(4)
  role: string;
}
