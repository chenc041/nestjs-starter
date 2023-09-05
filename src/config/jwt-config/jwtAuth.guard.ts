import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { FastifyRequest } from 'fastify';
import { UserService } from '~/user/user.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
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
        username: string;
        userId: number;
      }>(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
    const exist = await this.userService.checkUserExist({
      userId: user.userId,
    });
    if (!exist) {
      throw new NotFoundException('User not found');
    }
    request['user'] = user;
    return true;
  }
  private extractTokenFromHeader(request: FastifyRequest): string | undefined {
    const [, token] = request.headers.cookie?.split('=') ?? [];
    return token ? token : undefined;
  }
}
