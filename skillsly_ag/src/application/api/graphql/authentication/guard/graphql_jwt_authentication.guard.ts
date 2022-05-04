import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@application/api/graphql/authentication/decorator/public'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class GraphQLJwtAuthenticationGuard extends AuthGuard('jwt') {
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
    if (is_public) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      if (err) {
        Logger.error(err);
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal server error'
        }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: info.message
      }, HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
