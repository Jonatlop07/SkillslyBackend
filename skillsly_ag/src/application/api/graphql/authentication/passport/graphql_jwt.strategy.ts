import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GraphQLJwtPayload,
  GraphQLUserPayload
} from '@application/api/graphql/authentication/types/graphql_authentication_types';
import { GraphQLAuthenticationService } from '@application/api/graphql/authentication/service/graphql_authentication.service';

@Injectable()
export class GraphQLJwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger: Logger = new Logger(GraphQLJwtStrategy.name);

  constructor(
    private readonly config_service: ConfigService,
    private readonly auth_service: GraphQLAuthenticationService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config_service.get<string>('JWT_SECRET'),
    });
  }

  public async validate(payload: GraphQLJwtPayload): Promise<GraphQLUserPayload> {
    const user = await this.auth_service.queryUser(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    const { id, email } = user;
    return {
      id,
      email
    };
  }
}
