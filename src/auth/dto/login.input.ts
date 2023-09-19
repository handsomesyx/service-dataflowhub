import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginInput {
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
