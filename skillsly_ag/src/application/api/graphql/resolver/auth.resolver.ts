import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Public } from '@application/api/graphql/authentication/decorator/public'
import { Inject, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common'
import { GraphQLLocalAuthenticationGuard } from '@application/api/graphql/authentication/guard/graphql_local_authentication.guard'
import {
  GraphQLLoggedInUser,
  GraphQLRequestWithUser, GraphQLTFALoggedInUser,
  GraphQLUserPayload
} from '@application/api/graphql/authentication/types/graphql_authentication_types'
import { GraphQLAuthenticationService } from '@application/api/graphql/authentication/service/graphql_authentication.service'
import { GraphQLTwoFactorAuthService } from '@application/api/graphql/authentication/service/graphql_two_factor_auth.service'
import { CurrentUser } from '@application/api/graphql/authentication/decorator/current_user'
import { Response } from 'express'
import { JwtAuth } from '@application/api/graphql/authentication/decorator/jwt_auth'
import { DeactivateTwoFactorAuth } from '@application/api/graphql/authentication/decorator/deactivate_two_factor_auth'
import { AuthDITokens } from '@application/service/auth/di/auth_di_tokens'
import { RequestResetPasswordService } from '@application/service/auth/requester/request_reset_password.service'
import { ResetPasswordService } from '@application/service/auth/requester/reset_password.service'
import { AuthPayload } from '@application/api/graphql/model/auth/auth_payload'
import { AuthMapper } from '@application/api/graphql/mapper/auth.mapper'
import { TFAuthMapper } from '@application/api/graphql/mapper/tf_auth.mapper'
import { TFAuthPayload } from '@application/api/graphql/model/auth/tf_auth_payload'
import { GraphQLUpload } from 'graphql-upload'

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authentication_service: GraphQLAuthenticationService,
    private readonly two_factor_auth_service: GraphQLTwoFactorAuthService,
    @Inject(AuthDITokens.RequestResetPasswordService)
    private readonly request_reset_password_service: RequestResetPasswordService,
    @Inject(AuthDITokens.ResetPasswordService)
    private readonly reset_password_service: ResetPasswordService
  ) {
  }

  @Public()
  @UseGuards(GraphQLLocalAuthenticationGuard)
  @Mutation(() => AuthPayload)
  public async login(@Req() request: GraphQLRequestWithUser) {
    const result: GraphQLLoggedInUser = await this.authentication_service.login(request.user);
    return AuthMapper.toGraphQLModel(result);
  }

  @Mutation(() => GraphQLUpload)
  public async generateQRCode(
    @CurrentUser() graphql_user: GraphQLUserPayload,
    @Res() response: Response
  ) {
    const { otp_auth_url } = await this.two_factor_auth_service.generateTwoFactorAuthSecret(graphql_user.id);
    response.setHeader('content-type', 'image/png');
    return this.two_factor_auth_service.pipeQRCodeStream(response, otp_auth_url);
  }

  @DeactivateTwoFactorAuth()
  @JwtAuth()
  @Mutation(() => Int, { nullable: true })
  public async turnOnTwoFactorAuth(
    @CurrentUser() graphql_user: GraphQLUserPayload,
    @Args({ name: 'code' }) code: string
  ) {
    const is_valid_code = await this.two_factor_auth_service.isValidTwoFactorAuthCode(graphql_user.id, code);
    if (!is_valid_code)
      throw new UnauthorizedException('Invalid authentication code');
    await this.two_factor_auth_service.activationOfTwoFactorAuth(graphql_user.id, true);
    return null;
  }

  @DeactivateTwoFactorAuth()
  @JwtAuth()
  @Mutation(() => TFAuthPayload)
  public async authenticate(
    @CurrentUser() graphql_user: GraphQLUserPayload,
    @Args({ name: 'code' }) code: string
  ) {
    const is_valid_code = this.two_factor_auth_service.isValidTwoFactorAuthCode(graphql_user.id, code);
    if (!is_valid_code)
      throw new UnauthorizedException('Invalid authentication code');
    const result: GraphQLTFALoggedInUser = await this.two_factor_auth_service.login(graphql_user, true);
    return TFAuthMapper.toGraphQLModel(result);
  }

  @Public()
  @Mutation(() => Int, { nullable: true })
  public async requestResetPassword(@Args({ name: 'email' }) email: string) {
    await this.request_reset_password_service.execute({ email });
    return null;
  }

  @Public()
  @Mutation(() => Int, { nullable: true })
  public async resetPassword(
    @Args({ name: 'token' }) reset_password_token: string,
    @Args({ name: 'password' }) password: string
  ) {
    await this.reset_password_service.execute({
      reset_password_token,
      password
    });
    return null;
  }
}
