import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();

    if (!ctx.req.headers.authorization) {
      throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);
    }
    const parts = ctx.req.headers.authorization.split(' ');
    if (parts?.length === 2) {
      const jwt = parts[1];

      const user = this.jwtService.decode(jwt);
      ctx.user = user;
      return true;
    } else {
      return false;
    }
  }
}
