import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (token) {
      try {
        const decoded = this.jwtService.verifyToken(token);
        req['user'] = decoded; // Attach the decoded user to the request
      } catch (error) {
        console.error('JWT Verification Error:', error);
      }
    }

    next();
  }
}
