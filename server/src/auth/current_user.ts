import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Context, GqlExecutionContext } from '@nestjs/graphql';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const gqlCtx = GqlExecutionContext.create(ctx);
    return gqlCtx.getContext().user;
  },
);
