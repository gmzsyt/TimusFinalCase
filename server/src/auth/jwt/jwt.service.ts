import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtService {
  private readonly secretKey = process.env.JWT_SECRET_KEY;

  generateToken(payload: any): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: '1h' });
  }

  verifyToken(token: string): any {
    return jwt.verify(token, this.secretKey);
  }

  generateRefreshToken(payload: any): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: '7d' });
  }

  verifyRefreshToken(token: string): any {
    return jwt.verify(token, this.secretKey);
  }
}
