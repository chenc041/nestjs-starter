import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import {
  WinstonModuleOptionsFactory,
  WinstonModuleOptions,
} from 'nest-winston';

const { json, timestamp, combine } = winston.format;

const infoFilter = winston.format((info) => {
  return info.level === 'info' || info.level === 'warn' ? info : false;
});

const errorFilter = winston.format((info) => {
  return info.level === 'error' ? info : false;
});

const debugFilter = winston.format((info) => {
  return info.level === 'debug' ? info : false;
});

const warnFilter = winston.format((info) => {
  return info.level === 'warn' ? info : false;
});

const levelFormat = {
  error: errorFilter,
  info: infoFilter,
  warn: warnFilter,
  debug: debugFilter,
};

@Injectable()
export class WinstonConfigService implements WinstonModuleOptionsFactory {
  createWinstonModuleOptions(): WinstonModuleOptions {
    const { NODE_ENV } = process.env;
    const transports: any[] = [];
    if (NODE_ENV === 'development') {
      transports.push(new winston.transports.Console());
    } else {
      ['error', 'debug', 'info', 'warn'].forEach((item) => {
        transports.push(
          new winston.transports.DailyRotateFile({
            level: item,
            maxSize: '5m',
            maxFiles: '14d',
            zippedArchive: true,
            format: combine(levelFormat[item](), timestamp(), json()),
            datePattern: 'YYYY-MM-DD',
            filename: `log/api-${item}-%DATE%.log`,
          }),
        );
      });
    }
    return {
      transports: transports,
      defaultMeta: {
        appName: 'nestjs-starter',
      },
    };
  }
}
