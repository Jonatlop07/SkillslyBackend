import { PassportStrategy } from '@nestjs/passport'
import * as Strategy from 'passport-ldapauth';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express'

@Injectable()
export class HttpLdapStrategy extends PassportStrategy(Strategy, 'ldap') {
  private readonly logger: Logger = new Logger(HttpLdapStrategy.name);

  constructor() {
    super({
      passReqToCallback: true,
      server: {
        url: 'ldap://skillsly-ldap-srv',
        bindDN: 'cn=admin,dc=skillsly,dc=dev',
        bindCredentials: 'admin',
        searchBase: 'ou=skillsly,dc=skillsly,dc=dev',
        searchFilter: '(uid={{username}})',
      },
      credentialsLookup: (req: Request) => ({
        username: req.query.email,
        password: req.query.password
      }),
    },  (req: Request, user: any, done) => {
      return done(null, user);
    });
  }
}
