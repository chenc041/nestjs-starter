import { Controller, Get, UseGuards } from '@nestjs/common';
import { LoggingService } from '~/modules/system/logging/logging.service';
import { JwtAuthGuard } from '~/config/jwt/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { HttpResponse } from '~/utils';

@ApiTags('日志记录')
@UseGuards(JwtAuthGuard)
@Controller('logging')
export class LoggingController {
  constructor(private logging: LoggingService) {}

  @Get('list')
  async getList() {
    const r = await this.logging.list();
    return new HttpResponse({ statusCode: 1, data: r });
  }
}
