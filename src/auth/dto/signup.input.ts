import { IsNotEmpty, MinLength } from 'class-validator';

export class SignupInput {
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  id_card: string;

  @IsNotEmpty()
  real_name: string;

  head_url?: string;

  @IsNotEmpty()
  gender: number;

  @IsNotEmpty()
  mobile: string;
}
