import {
  Body,
  Controller, Delete, Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger, Param, Patch,
  Post, Query,
  ValidationPipe,
} from '@nestjs/common';
import { UserDITokens } from '@core/domain/di/user_di_tokens';
import CreateUserInteractor from '@core/domain/use-case/interactor/create_user.interactor';
import UpdateCredentialsInteractor from '@core/domain/use-case/interactor/update_credentials.interactor';
import DeleteUserInteractor from '@core/domain/use-case/interactor/delete_user.interactor';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  CreateUserAdapter,
} from '@application/api/http-rest/http-adapter/create_user.adapter';
import { CreateUserDTO } from '@application/api/http-rest/http-dto/http_create_user.dto';
import { HttpExceptionMapper } from '@application/api/http-rest/exception/http_exception.mapper';
import { RequestResetPasswordDTO } from '@application/api/http-rest/http-dto/http_request_reset_password.dto';
import { ResetPasswordDTO } from '@application/api/http-rest/http-dto/http_reset_password.dto';
import { UpdateCredentialsDTO } from '@application/api/http-rest/http-dto/http_update_credentials.dto';
import { UpdateCredentialsResponseDTO } from '@application/api/http-rest/http-dto/http_update_credentials_response.dto';
import { UpdateCredentialsAdapter } from '@application/api/http-rest/http-adapter/update_credentials.adapter';
import ValidateCredentialsInteractor from '@core/domain/use-case/interactor/validate_credentials.interactor'
import { UpdateUserDTO } from '@application/api/http-rest/http-dto/http_update_user.dto'
import { UpdateUserResponseDTO } from '@application/api/http-rest/http-dto/http_update_user_response.dto'
import { UpdateUserAdapter } from '@application/api/http-rest/http-adapter/update_user.adapter'
import UpdateUserInteractor from '@core/domain/use-case/interactor/update_user.interactor'
import QueryUserInteractor from '@core/domain/use-case/interactor/query_user.interactor'
import RequestResetPasswordInteractor from '@core/domain/use-case/interactor/request_reset_password.interactor'
import ResetPasswordInteractor from '@core/domain/use-case/interactor/reset_password.interactor'

@Controller('auth')
@ApiTags('auth')
@ApiInternalServerErrorResponse({
  description: 'An internal server error occurred'
})
export class AuthController {
  private readonly logger: Logger = new Logger(AuthController.name);

  constructor(
    @Inject(UserDITokens.ValidateCredentialsInteractor)
    private readonly validate_credentials_interactor: ValidateCredentialsInteractor,
    @Inject(UserDITokens.CreateUserInteractor)
    private readonly create_user_interactor: CreateUserInteractor,
    @Inject(UserDITokens.UpdateCredentialsInteractor)
    private readonly update_credentials_interactor: UpdateCredentialsInteractor,
    @Inject(UserDITokens.UpdateUserInteractor)
    private readonly update_user_interactor: UpdateUserInteractor,
    @Inject(UserDITokens.DeleteUserInteractor)
    private readonly delete_user_interactor: DeleteUserInteractor,
    @Inject(UserDITokens.QueryUserInteractor)
    private readonly query_user_interactor: QueryUserInteractor,
    @Inject(UserDITokens.RequestResetPasswordInteractor)
    private readonly request_reset_password_service: RequestResetPasswordInteractor,
    @Inject(UserDITokens.ResetPasswordInteractor)
    private readonly reset_password_service: ResetPasswordInteractor,
  ) {
  }

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

  @Get('validate-credentials')
  @HttpCode(HttpStatus.OK)
  public async validateCredentials(
    @Query('email', new ValidationPipe()) email: string,
    @Query('password', new ValidationPipe()) password: string
  ) {
    try {
      return await this.validate_credentials_interactor.execute({
        email,
        password
      });
    } catch (e) {
      throw HttpExceptionMapper.toHttpException(e);
    }
  }

  @Get('user/:user_id')
  public async queryUser(
    @Param('user_id', new ValidationPipe()) user_id: string
 ) {
    try {
      return await this.query_user_interactor.execute({
        user_id
      });
    } catch (e) {
      throw HttpExceptionMapper.toHttpException(e);
    }
  }

  @Patch('user/credentials/:user_id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'User login credentials successfully updated' })
  @ApiUnauthorizedResponse({
    description:
      'Cannot update the credentials of an account that does not belong to the user',
  })
  public async updateCredentials(
    @Param('user_id') user_id: string,
    @Body(new ValidationPipe()) update_credentials_details: UpdateCredentialsDTO,
  ): Promise<UpdateCredentialsResponseDTO> {
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

  @Patch('user/:user_id')
  public async updateUser(
    @Param('user_id') user_id: string,
    @Body(new ValidationPipe()) update_user_details: UpdateUserDTO,
  ): Promise<UpdateUserResponseDTO> {
    try {
      return UpdateUserAdapter.toResponseDTO(
        await this.update_user_interactor.execute(
          UpdateUserAdapter.toInputModel(
            user_id,
            update_user_details,
          ),
        ),
      );
    } catch (e) {
      throw HttpExceptionMapper.toHttpException(e);
    }
  }

  @Delete('user/:user_id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteUser(
    @Param('user_id') user_id: string,
    @Query('password') password: string
  ) {
    try {
      await this.delete_user_interactor.execute({ id: user_id, password });
    } catch (e) {
      throw HttpExceptionMapper.toHttpException(e);
    }
  }

  @Patch('/request-reset-password')
  @HttpCode(HttpStatus.OK)
  public async requestResetPassword(
    @Body() request_reset_password_dto: RequestResetPasswordDTO
  ) {
    try {
      return await this.request_reset_password_service.execute({
        email: request_reset_password_dto.email
      });
    } catch (e) {
      throw HttpExceptionMapper.toHttpException(e);
    }
  }

  @Patch('/reset-password/:token')
  @HttpCode(HttpStatus.OK)
  public async resetPassword(
    @Param('token') token: string,
    @Body() body
  ) {
    const { reset_password_token, password }: ResetPasswordDTO = {
      reset_password_token: token,
      password: body.password
    };
    try {
      return await this.reset_password_service.execute({
        reset_password_token,
        password
      });
    } catch (e) {
      throw HttpExceptionMapper.toHttpException(e);
    }
  }
}
