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
    try {
      const decoded = jwt.verify(token, this.secretKey);
      if (decoded && decoded.exp && decoded.exp * 1000 > Date.now()) {
        return decoded;
      } else {
        throw new Error('Token has expired');
      }
    } catch (error) {
      throw new Error('Token could not be verified');
    }
  }

  generateRefreshToken(payload: any): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: '7d' });
  }

  verifyRefreshToken(token: string): any {
    return jwt.verify(token, this.secretKey);
  }
}
