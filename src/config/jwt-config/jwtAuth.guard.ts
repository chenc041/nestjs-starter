import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { FastifyRequest } from 'fastify';
import { AUTH_COOKIES_KEY } from '~/constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('token not found');
    }
    let user = undefined;
    try {
      user = await this.jwtService.verifyAsync<{
        userId: number;
        username: string;
      }>(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
    request['user'] = user;
    return true;
  }

  private extractTokenFromHeader(request: FastifyRequest): string | undefined {
    const token =
      request.headers.authorization || request.cookies[AUTH_COOKIES_KEY];
    return token ? token : undefined;
  }
}
