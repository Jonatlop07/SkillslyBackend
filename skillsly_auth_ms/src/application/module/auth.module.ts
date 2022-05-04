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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { UpdateUserService } from '@core/service/update_user.service'
import { QueryUserService } from '@core/service/query_user.service'
import { MailerMailRepositoryAdapter } from '@infrastructure/adapter/mail/mailer/repository/mailer_mail.repository_adapter'
import { RequestResetPasswordService } from '@core/service/request_reset_password.service'
import { MailerService } from '@nestjs-modules/mailer'
import { ResetPasswordService } from '@core/service/reset_password.service'

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

const mail_providers: Array<Provider> = [
  {
    provide: UserDITokens.MailRepository,
    useFactory: (repository) => new MailerMailRepositoryAdapter(repository),
    inject: [MailerService]
  }
];

const use_case_providers: Array<Provider> = [
  {
    provide: UserDITokens.CreateUserInteractor,
    useFactory: (gateway) => new CreateUserService(gateway),
    inject: [UserDITokens.UserRepository]
  },
  {
    provide: UserDITokens.QueryUserInteractor,
    useFactory: (gateway) => new QueryUserService(gateway),
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
    provide: UserDITokens.UpdateUserInteractor,
    useFactory: (gateway) => new UpdateUserService(gateway),
    inject: [UserDITokens.UserRepository]
  },
  {
    provide: UserDITokens.DeleteUserInteractor,
    useFactory: (gateway) => new DeleteUserService(gateway),
    inject: [UserDITokens.UserRepository]
  },
  {
    provide: UserDITokens.RequestResetPasswordInteractor,
    useFactory: (gateway, mail_gateway) => new RequestResetPasswordService(gateway, mail_gateway),
    inject: [UserDITokens.UserRepository, UserDITokens.MailRepository]
  },
  {
    provide: UserDITokens.ResetPasswordInteractor,
    useFactory: (gateway) => new ResetPasswordService(gateway),
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
    HttpModule
  ],
  providers: [
    ...persistence_providers,
    ...mail_providers,
    ...use_case_providers,
  ]
})
export class AuthModule {}
