import { Strategy } from 'passport-local';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { GraphQLUserPayload } from '@application/api/graphql/authentication/types/graphql_authentication_types'
import { GraphQLAuthenticationService } from '@application/api/graphql/authentication/service/graphql_authentication.service'

@Injectable()
export class GraphQLLocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger: Logger = new Logger(GraphQLLocalStrategy.name);

  constructor(private authentication_service: GraphQLAuthenticationService) {
    super({
      usernameField: 'email',
      passwordField: 'password'
    });
  }

  async validate(username: string, password: string): Promise<GraphQLUserPayload> {
    const user = await this.authentication_service.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
