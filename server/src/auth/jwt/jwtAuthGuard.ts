import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];
    console.log(request.headers);
    console.log(token);


    if (!token) {
      return false;
    }

    try {
      const decoded = this.jwtService.verifyToken(token);
      request.user = decoded; 
      return true;
    } catch (error) {
      return false;
    }
  }
}
