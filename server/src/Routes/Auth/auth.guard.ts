import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constans';
import { Request } from 'express';
import { Role } from 'src/Enums/role.enum';
const jwtService = new JwtService();
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private role: Role) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );

      request['user'] = payload;
      if (this.role === Role.NONE) {
        return true;
      }
      if (request['user'].role != this.role) {
        throw new UnauthorizedException();
      }
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
