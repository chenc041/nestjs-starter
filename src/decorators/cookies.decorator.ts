import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Cookies = createParamDecorator((_, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getResponse();
});
