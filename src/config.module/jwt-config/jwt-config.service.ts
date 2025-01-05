import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtConfigService {
  constructor(private readonly jwtService: JwtService) {}

  async signToken(user: { username: string; userId: number }) {
    const { username, userId } = user;
    const payload = { username, userId };
    const token = await this.jwtService.signAsync(payload, { secret: '123' });
    return {
      token,
    };
  }
}
