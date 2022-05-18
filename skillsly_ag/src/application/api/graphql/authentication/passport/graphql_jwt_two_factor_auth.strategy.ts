import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  GraphQLJwtPayload,
  GraphQLUserPayload
} from '@application/api/graphql/authentication/types/graphql_authentication_types';
import { GraphQLAuthenticationService } from '@application/api/graphql/authentication/service/graphql_authentication.service';

@Injectable()
export class GraphQLJwtTwoFactorAuthStrategy extends PassportStrategy(Strategy, 'jwt-two-factor') {
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

  async validate(payload: GraphQLJwtPayload): Promise<GraphQLUserPayload> {
    const user = await this.auth_service.queryUser(payload.id);
    if (!user)
      throw new UnauthorizedException();
    const { id, email, is_two_factor_auth_enabled } = user;
    const graphql_user_payload: GraphQLUserPayload = {
      id,
      email,
      is_two_factor_auth_enabled
    };
    if (!is_two_factor_auth_enabled)
      return graphql_user_payload;
    if (payload.is_two_factor_authenticated)
      return graphql_user_payload;
  }
}
