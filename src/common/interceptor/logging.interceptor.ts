import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LoggingService } from '~/modules/system/logging/logging.service';
import { omit } from 'lodash';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      tap(() => {
        const body = request.body;
        const method = request.method;
        const duration = Date.now() - now;
        const ip = request.ips.length ? request.ips[0] : request.ip;
        this.loggingService.save({
          ip,
          duration,
          url: request.url,
          query: request.query,
          params: request.params,
          method: method.toUpperCase(),
          userId: request.user?.userId,
          body: omit(body ?? {}, 'password'),
          userAgent: request.headers['user-agent'],
        });
      }),
    );
  }
}
