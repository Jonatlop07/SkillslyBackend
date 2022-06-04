import { AuthGuard } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class HttpLdapAuthenticationGuard extends AuthGuard('ldap') {
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
