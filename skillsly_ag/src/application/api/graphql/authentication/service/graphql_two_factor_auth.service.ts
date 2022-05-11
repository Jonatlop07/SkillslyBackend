import { Inject, Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AuthDITokens } from '@application/service/auth/di/auth_di_tokens'
import {
  GraphQLJwtPayload, GraphQLTFALoggedInUser,
  GraphQLUserPayload
} from '@application/api/graphql/authentication/types/graphql_authentication_types'
import { AuthQueryUserService } from '@application/service/auth/requester/query_user.service'
import { UpdateUserService } from '@application/service/auth/requester/update_user.service'

@Injectable()
export class GraphQLTwoFactorAuthService {
  constructor(
    private readonly jwt_service: JwtService,
    private readonly config_service: ConfigService,
    @Inject(AuthDITokens.QueryUserService)
    private readonly auth_query_user_service: AuthQueryUserService,
    @Inject(AuthDITokens.UpdateUserService)
    private readonly update_user_service: UpdateUserService
  ) {
  }

  public async generateTwoFactorAuthSecret(user_id: string) {
    const { user } = await this.auth_query_user_service.execute({ user_id });
    const secret = authenticator.generateSecret();
    const app_name = this.config_service.get('TWO_FACTOR_AUTHENTICATION_APP_NAME');
    const otp_auth_url = authenticator.keyuri(user.email, app_name, secret);
    await this.update_user_service.execute({
      user_id,
      two_factor_auth_secret: secret
    });
    return {
      otp_auth_url
    };
  }

  public async pipeQRCodeStream(stream: Response, otpPathUrl: string) {
    return await toFileStream(stream, otpPathUrl);
  }

  public async activationOfTwoFactorAuth(user_id: string, status: boolean) {
    return await this.update_user_service.execute({
      user_id,
      is_two_factor_auth_enabled: status
    });
  }

  public async isValidTwoFactorAuthCode(user_id: string, code: string) {
    const { user: { two_factor_auth_secret } } = await this.auth_query_user_service.execute({ user_id });
    return authenticator.verify({
      token: code,
      secret: two_factor_auth_secret
    });
  }

  public async login(user: GraphQLUserPayload, is_two_factor_authenticated: boolean): Promise<GraphQLTFALoggedInUser> {
    const payload: GraphQLJwtPayload = { id: user.id, is_two_factor_authenticated };
    const access_token = this.jwt_service.sign(payload);
    await this.update_user_service.execute({ user_id: user.id, access_token });
    return {
      id: user.id,
      email: user.email,
      access_token,
      is_two_factor_auth_enabled: user.is_two_factor_auth_enabled
    };
  }
}
