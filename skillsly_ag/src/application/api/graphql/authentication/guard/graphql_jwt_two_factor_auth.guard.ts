import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@application/api/graphql/authentication/decorator/public';
import { DEACTIVATE_TWO_FACTOR_AUTH } from '@application/api/graphql/authentication/decorator/deactivate_two_factor_auth';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GraphQLJwtTwoFactorAuthGuard extends AuthGuard('jwt-two-factor') {
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  canActivate(context: ExecutionContext) {
    const is_public = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const deactivate_two_factor_auth = this.reflector.getAllAndOverride<boolean>(DEACTIVATE_TWO_FACTOR_AUTH, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (is_public || deactivate_two_factor_auth) {
      return true;
    }
    return super.canActivate(context);
  }
}
