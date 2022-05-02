import { UserDITokens } from '@core/domain/di/user_di_tokens';
import { Module, Provider } from '@nestjs/common';
import { TypeOrmUserRepositoryAdapter } from '@infrastructure/adapter/persistence/typeorm/repository/typeorm_user.repository_adapter';
import { TypeOrmDITokens } from '@infrastructure/adapter/persistence/typeorm/di/typeorm_di_tokens';
import { Connection } from 'typeorm';
import { CreateUserService } from '@core/service/create_user.service';
import { AuthController } from '@application/api/http-rest/controller/auth.controller';
import { TypeOrmUserRepository } from '@infrastructure/adapter/persistence/typeorm/repository/typeorm_user.repository';
import { ValidateCredentialsService } from '@core/service/validate_credentials.service';
import { UpdateCredentialsService } from '@core/service/update_credentials.service';
import { DeleteUserService } from '@core/service/delete_user.service';
import { TwoFactorAuthController } from '@application/api/http-rest/controller/two_factor_auth.controller';
import { HttpTwoFactorAuthService } from '@application/api/http-rest/authentication/service/http_two_factor_auth.service';
import { HttpAuthenticationService } from '@application/api/http-rest/authentication/service/http_authentication.service';
import { HttpResetPasswordService } from '@application/api/http-rest/authentication/service/http_reset_password.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { HttpModule } from '@nestjs/axios';
import { HttpLocalStrategy } from '@application/api/http-rest/authentication/passport/http_local.strategy';
import { HttpJwtStrategy } from '@application/api/http-rest/authentication/passport/http_jwt.strategy';
import { HttpJwtTwoFactorAuthStrategy } from '@application/api/http-rest/authentication/passport/http_jwt_two_factor_auth.strategy';

const persistence_providers: Array<Provider> = [
  {
    provide: UserDITokens.UserRepository,
    useFactory: (repository) => new TypeOrmUserRepositoryAdapter(repository),
    inject: [TypeOrmDITokens.UserRepository]
  },
  {
    provide: TypeOrmDITokens.UserRepository,
    useFactory: connection => connection.getCustomRepository(TypeOrmUserRepository),
    inject: [Connection]
  }
];

const use_case_providers: Array<Provider> = [
  {
    provide: UserDITokens.CreateUserInteractor,
    useFactory: (gateway) => new CreateUserService(gateway),
    inject: [UserDITokens.UserRepository]
  },
  {
    provide: UserDITokens.ValidateCredentialsInteractor,
    useFactory: (gateway) => new ValidateCredentialsService(gateway),
    inject: [UserDITokens.UserRepository]
  },
  {
    provide: UserDITokens.UpdateCredentialsInteractor,
    useFactory: (gateway) => new UpdateCredentialsService(gateway),
    inject: [UserDITokens.UserRepository]
  },
  {
    provide: UserDITokens.DeleteUserInteractor,
    useFactory: (gateway) => new DeleteUserService(gateway),
    inject: [UserDITokens.UserRepository]
  }
];

@Module({
  controllers: [AuthController, TwoFactorAuthController],
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config_service: ConfigService) => ({
        secret: config_service.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${config_service.get<string>('JWT_EXPIRATION_TIME')}m`,
        },
      }),
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config_service: ConfigService) => ({
        transport: {
          host: config_service.get<string>('MAILER_HOST'),
          port: config_service.get<string>('MAILER_PORT'),
          ignoreTLS: config_service.get<boolean>('MAILER_IGNORE_TLS'),
          secure: config_service.get<boolean>('MAILER_SECURE'),
          secureConnection: false,
          tls: {
            ciphers: 'SSLv3',
          },
          auth: {
            user: config_service.get<boolean>('USER_MAILER'),
            pass: config_service.get<boolean>('PASS_MAILER'),
          },
        },
        defaults: {
          from: '"No Reply" <no-reply@localhost>',
        },
        preview: true,
      }),
    }),
    MailerModule,
    HttpModule,
  ],
  providers: [
    HttpTwoFactorAuthService,
    HttpAuthenticationService,
    HttpResetPasswordService,
    HttpLocalStrategy,
    HttpJwtStrategy,
    HttpJwtTwoFactorAuthStrategy,
    ...persistence_providers,
    ...use_case_providers,
  ],
  exports: [HttpAuthenticationService]
})
export class AuthModule {}
