import {
  Body,
  Controller, Delete,
  HttpCode, HttpException,
  HttpStatus,
  Inject,
  Logger, Param, Patch,
  Post, Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserDITokens } from '@core/domain/di/user_di_tokens';
import CreateUserInteractor from '@core/domain/use-case/interactor/create_user.interactor';
import UpdateCredentialsInteractor from '@core/domain/use-case/interactor/update_credentials.interactor';
import DeleteUserInteractor from '@core/domain/use-case/interactor/delete_user.interactor';
import { HttpAuthenticationService } from '@application/api/http-rest/authentication/service/http_authentication.service';
import { HttpResetPasswordService } from '@application/api/http-rest/authentication/service/http_reset_password.service';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Public } from '@application/api/http-rest/authentication/decorator/public';
import {
  CreateUserAdapter,
} from '@application/api/http-rest/http-adapter/create_user.adapter';
import { CreateUserDTO } from '@application/api/http-rest/http-dto/http_create_user.dto';
import { HttpExceptionMapper } from '@application/api/http-rest/exception/http_exception.mapper';
import { HttpLocalAuthenticationGuard } from '@application/api/http-rest/authentication/guard/http_local_authentication.guard';
import {
  HttpLoggedInUser,
  HttpRequestWithUser, HttpUserPayload,
} from '@application/api/http-rest/authentication/types/http_authentication_types';
import { RequestResetPasswordDTO } from '@application/api/http-rest/authentication/types/request_reset_password.dto';
import { ResetPasswordDTO } from '@application/api/http-rest/authentication/types/reset_password.dto';
import { Observable } from 'rxjs';
import { HttpUser } from '@application/api/http-rest/authentication/decorator/http_user';
import { UpdateCredentialsDTO } from '@application/api/http-rest/http-dto/http_update_credentials.dto';
import { UpdateCredentialsResponseDTO } from '@application/api/http-rest/http-dto/http_update_credentials_response.dto';
import { UpdateCredentialsAdapter } from '@application/api/http-rest/http-adapter/update_credentials.adapter';

@Controller('auth')
@ApiTags('auth')
@ApiInternalServerErrorResponse({
  description: 'An internal server error occurred'
})
export class AuthController {
  private readonly logger: Logger = new Logger(AuthController.name);

  constructor(
    private readonly authentication_service: HttpAuthenticationService,
    private readonly reset_password_service: HttpResetPasswordService,
    @Inject(UserDITokens.CreateUserInteractor)
    private readonly create_user_interactor: CreateUserInteractor,
    @Inject(UserDITokens.UpdateCredentialsInteractor)
    private readonly update_credentials_interactor: UpdateCredentialsInteractor,
    @Inject(UserDITokens.DeleteUserInteractor)
    private readonly delete_user_interactor: DeleteUserInteractor
  ) {
  }

  @Public()
  @Post('user')
  @ApiCreatedResponse({
    description: 'User account has been successfully created',
  })
  @ApiForbiddenResponse({ description: 'Invalid sign up data format' })
  @ApiConflictResponse({
    description: 'Tried to create an account that already exists',
  })
  @HttpCode(HttpStatus.CREATED)
  public async createUser(
    @Body(new ValidationPipe())
      create_user_details: CreateUserDTO,
  ) {
    try {
      const result = await this.create_user_interactor.execute(
        await CreateUserAdapter.toInputModel(
          create_user_details,
        ),
      );
      return CreateUserAdapter.toResponseDTO(result);
    } catch (e) {
      throw HttpExceptionMapper.toHttpException(e);
    }
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(HttpLocalAuthenticationGuard)
  public async login(@Req() request: HttpRequestWithUser): Promise<HttpLoggedInUser> {
    return await this.authentication_service.login(request.user);
  }

  @Patch('user/:user_id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User login credentials successfully updated' })
  @ApiUnauthorizedResponse({
    description:
      'Cannot update the credentials of an account that does not belong to the user',
  })
  public async updateCredentials(
    @HttpUser() http_user: HttpUserPayload,
    @Param('user_id') user_id: string,
    @Body(new ValidationPipe())
      update_credentials_details: UpdateCredentialsDTO,
  ): Promise<UpdateCredentialsResponseDTO> {
    if (user_id !== http_user.id)
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Cannot update the credentials of an account that does not belong to you',
        },
        HttpStatus.UNAUTHORIZED,
      );
    try {
      return UpdateCredentialsAdapter.toResponseDTO(
        await this.update_credentials_interactor.execute(
          UpdateCredentialsAdapter.toInputModel(
            user_id,
            update_credentials_details,
          ),
        ),
      );
    } catch (e) {
      throw HttpExceptionMapper.toHttpException(e);
    }
  }

  @Delete('user/:user_id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  public async deleteUser(
    @HttpUser() http_user: HttpUserPayload,
    @Param('user_id') user_id: string,
    @Query('password') password: string
  ) {
    if (user_id !== http_user.id)
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Cannot delete an account that does not belong to you',
        },
        HttpStatus.UNAUTHORIZED,
      );
    try {
      await this.delete_user_interactor.execute({ id: user_id, password });
    } catch (e) {
      throw HttpExceptionMapper.toHttpException(e);
    }
  }

  @Public()
  @Patch('/request-reset-password')
  @HttpCode(HttpStatus.OK)
  public async requestResetPassword(
    @Body() requestResetPasswordDTO: RequestResetPasswordDTO
  ): Promise<void> {
    try {
      return await this.reset_password_service.requestResetPassword(
        requestResetPasswordDTO
      );
    } catch (e) {
      throw HttpExceptionMapper.toHttpException(e);
    }
  }

  @Public()
  @Patch('/reset-password/:token')
  @HttpCode(HttpStatus.OK)
  public async resetPassword(
    @Param('token') token: string,
    @Body() body
  ): Promise<void> {
    const resetPassword: ResetPasswordDTO = {
      reset_password_token: token,
      password: body.password
    };
    try {
      return await this.reset_password_service.resetPassword(resetPassword);
    } catch (e) {
      throw HttpExceptionMapper.toHttpException(e);
    }

  }

  @Public()
  @Post('val-captcha')
  @HttpCode(HttpStatus.OK)
  public validateCaptcha(@Body() details): Observable<any> {
    return this.authentication_service.validateCaptcha(details.response);
  }
}
