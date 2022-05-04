import { Inject, Injectable, Logger } from '@nestjs/common'
import { Nullable, Optional } from '@application/common/type/common_types'
import {
  GraphQLJwtPayload,
  GraphQLLoggedInUser,
  GraphQLUserPayload
} from '@application/api/graphql/authentication/types/graphql_authentication_types'
import { AuthDITokens } from '@application/service/auth/di/auth_di_tokens'
import { JwtService } from '@nestjs/jwt'
import { ValidateCredentialsService } from '@application/service/auth/requester/validate_credentials.service'
import { AuthQueryUserService } from '@application/service/auth/requester/query_user.service'
import AuthUserModel from '@application/service/auth/model/auth_user.model'
import { UpdateUserService } from '@application/service/auth/requester/update_user.service'


@Injectable()
export class GraphQLAuthenticationService {
  private readonly logger: Logger = new Logger(GraphQLAuthenticationService.name);

  constructor(
    private readonly jwt_service: JwtService,
    @Inject(AuthDITokens.QueryUserService)
    private readonly auth_query_user_service: AuthQueryUserService,
    @Inject(AuthDITokens.ValidateCredentialsService)
    private readonly validate_credentials_service: ValidateCredentialsService,
    @Inject(AuthDITokens.UpdateUserService)
    private readonly update_user_service: UpdateUserService
  ) { }

  public async validateUser(username: string, password: string): Promise<Nullable<GraphQLUserPayload>> {
    return await this.validate_credentials_service.execute({
      email: username,
      password,
    });
  }

  public async login(user: GraphQLUserPayload): Promise<GraphQLLoggedInUser> {
    const payload: GraphQLJwtPayload = { id: user.id };
    const access_token = this.jwt_service.sign(payload);
    await this.update_user_service.execute({ user_id: user.id , access_token });
    if (user.is_two_factor_auth_enabled)
      return {
        access_token
      };
    return {
      id: user.id,
      email: user.email,
      access_token
    };
  }

  public async queryUser(user_id: string): Promise<Optional<AuthUserModel>> {
    const { user } = await this.auth_query_user_service.execute({ user_id });
    return user;
  }
}
