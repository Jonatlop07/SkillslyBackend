import { BadGatewayException, Inject, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import {
  HttpJwtPayload,
  HttpLoggedInUser,
  HttpUserPayload
} from '@application/api/http-rest/authentication/types/http_authentication_types';
import { map, Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { UserDITokens } from '@core/domain/di/user_di_tokens';
import ValidateCredentialsInteractor from '@core/domain/use-case/interactor/validate_credentials.interactor';
import { Nullable, Optional } from '@core/common/type/common_types';
import { UserDTO } from '@core/domain/use-case/dto/user.dto';
import UpdateCredentialsGateway from '@core/domain/use-case/gateway/update_credentials.gateway';

@Injectable()
export class HttpAuthenticationService {
  private readonly logger: Logger = new Logger(HttpAuthenticationService.name);

  constructor(
    @Inject(UserDITokens.ValidateCredentialsInteractor)
    private readonly validate_credentials_interactor: ValidateCredentialsInteractor,
    private readonly jwt_service: JwtService,
    private readonly config_service: ConfigService,
    private readonly http_service: HttpService,
    @Inject(UserDITokens.UserRepository)
    private readonly update_gateway: UpdateCredentialsGateway,
  ) { }

  public async validateUser(username: string, password: string): Promise<Nullable<HttpUserPayload>> {
    return await this.validate_credentials_interactor.execute({
      email: username,
      password,
    });
  }

  public async login(user: HttpUserPayload): Promise<HttpLoggedInUser> {
    const payload: HttpJwtPayload = { id: user.id };
    const access_token = this.jwt_service.sign(payload);
    await this.update_gateway.partialUpdate({ id: user.id }, { access_token });
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

  public async getUser(id: string): Promise<Optional<UserDTO>> {
    return await this.update_gateway.findOne({ id });
  }

  public validateCaptcha(response: string): Observable<any> {
    const secretKey = this.config_service.get('CAPTCHA_SITE_KEY');
    const url =
      'https://www.google.com/recaptcha/api/siteverify?secret=' +
      secretKey +
      '&response=' +
      response;
    return this.http_service
      .post(url)
      .pipe(
        map((response:any) => {
          if (!response.data.success){
            throw new BadGatewayException();
          }
          return response.data;
        }),
      );
  }
}
