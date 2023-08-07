import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const GetCookies = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return key ? request.cookies[key] : request.cookies;
  },
);
