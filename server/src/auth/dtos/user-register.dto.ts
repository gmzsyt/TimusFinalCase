
import { IsNotEmpty, IsEmail, MinLength, Matches } from 'class-validator';

export class UserRegisterDTO {
  @IsNotEmpty()
  @MinLength(8, { message: 'Username must be at least 8 characters long' })
  username: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one numeric digit',
  })
  password: string;

  @IsNotEmpty()
  role: 'admin' | 'editor'; 
}
