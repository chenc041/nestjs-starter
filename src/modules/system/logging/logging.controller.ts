import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '~/setup/jwt/jwt-auth.guard';
import { LoggingService } from '~/modules/system/logging/logging.service';
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
