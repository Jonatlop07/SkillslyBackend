import { Inject, Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';
import {
  HttpJwtPayload,
  HttpUserPayload
} from '@application/api/http-rest/authentication/types/http_authentication_types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { UserDITokens } from '@core/domain/di/user_di_tokens';
import { UserDTO } from '@core/domain/use-case/dto/user.dto';
import UpdateCredentialsGateway from '@core/domain/use-case/gateway/update_credentials.gateway';

@Injectable()
export class HttpTwoFactorAuthService {
  constructor(
    private readonly config_service: ConfigService,
    @Inject(UserDITokens.UserRepository)
    private readonly update_gateway: UpdateCredentialsGateway,
    private readonly jwt_service: JwtService
  ) {
  }

  public async generateTwoFactorAuthSecret(id: string) {
    const user: UserDTO = await this.update_gateway.findOne({ id });
    const secret = authenticator.generateSecret();
    const app_name = this.config_service.get('TWO_FACTOR_AUTHENTICATION_APP_NAME');
    const otp_auth_url = authenticator.keyuri(user.email, app_name, secret);
    await this.update_gateway.partialUpdate({
      id
    }, {
      two_factor_auth_secret: secret
    });
    return {
      otp_auth_url
    };
  }

  public async pipeQRCodeStream(stream: Response, otpPathUrl: string) {
    return await toFileStream(stream, otpPathUrl);
  }

  public async activationOfTwoFactorAuth(id: string, status: boolean) {
    return await this.update_gateway.partialUpdate({
      id
    }, {
      is_two_factor_auth_enabled: status
    });
  }

  public async isValidTwoFactorAuthCode(id: string, code: string) {
    const { two_factor_auth_secret } = await this.update_gateway.findOne({ id });
    return authenticator.verify({
      token: code,
      secret: two_factor_auth_secret
    });
  }

  public async login(user: HttpUserPayload, is_two_factor_authenticated: boolean) {
    const payload: HttpJwtPayload = { id: user.id, is_two_factor_authenticated };
    const access_token = this.jwt_service.sign(payload);
    await this.update_gateway.partialUpdate({ id: user.id }, { access_token });
    return {
      id: user.id,
      email: user.email,
      access_token,
      is_two_factor_auth_enabled: user.is_two_factor_auth_enabled
    };
  }
}
