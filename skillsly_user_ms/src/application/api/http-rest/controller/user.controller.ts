import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param, Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse, ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HttpExceptionMapper } from '../exception/http_exception.mapper';
import { UserDITokens } from '@core/domain/di/user_di_tokens'
import { CreateUserAccountInteractor } from '@core/domain/use-case/account/interactor/create_user_account.interactor'
import { UpdateUserAccountInteractor } from '@core/domain/use-case/account/interactor/update_user_account.interactor'
import { QueryUserAccountInteractor } from '@core/domain/use-case/account/interactor/query_user_account.interactor'
import { DeleteUserAccountInteractor } from '@core/domain/use-case/account/interactor/delete_user_account.interactor'
import { SearchUsersInteractor } from '@core/domain/use-case/search/interactor/search_users.interactor'
import { CreateFollowUserRequestInteractor } from '@core/domain/use-case/follow_request/interactor/create_follow_user_request.interactor'
import { UpdateFollowUserRequestInteractor } from '@core/domain/use-case/follow_request/interactor/update_follow_user_request.interactor'
import { DeleteFollowUserRequestInteractor } from '@core/domain/use-case/follow_request/interactor/delete_user_follow_request.interactor'
import { GetFollowUserRequestCollectionInteractor } from '@core/domain/use-case/follow_request/interactor/get_follow_user_request_collection.interactor'
import { CreateUserAccountDTO } from '@application/api/http-rest/http-dto/http_create_user_account.dto'
import { CreateUserAccountMapper } from '@application/api/http-rest/http-mapper/http_create_user_account.mapper'
import { UpdateUserAccountDTO } from '@application/api/http-rest/http-dto/http_update_user_account.dto'
import CreateUserAccountResponseDTO from '@application/api/http-rest/http-dto/http_create_user_account.response_dto'
import UpdateUserAccountResponseDTO from '@application/api/http-rest/http-dto/http_update_user_account.response_dto'
import { UpdateUserAccountMapper } from '@application/api/http-rest/http-mapper/http_update_user_account.mapper'
import { SearchUsersMapper } from '@application/api/http-rest/http-mapper/http_search_users.mapper'

@Controller('user')
@ApiTags('user')
@ApiInternalServerErrorResponse({
  description: 'An internal server error occurred',
})
export class UserController {
  private readonly logger: Logger = new Logger(UserController.name);

  constructor(
    @Inject(UserDITokens.CreateUserAccountInteractor)
    private readonly create_user_account_interactor: CreateUserAccountInteractor,
    @Inject(UserDITokens.UpdateUserAccountInteractor)
    private readonly update_user_account_interactor: UpdateUserAccountInteractor,
    @Inject(UserDITokens.QueryUserAccountInteractor)
    private readonly query_user_account_interactor: QueryUserAccountInteractor,
    @Inject(UserDITokens.DeleteUserAccountInteractor)
    private readonly delete_user_account_interactor: DeleteUserAccountInteractor,
    @Inject(UserDITokens.SearchUsersInteractor)
    private readonly search_users_interactor: SearchUsersInteractor,
    @Inject(UserDITokens.CreateFollowUserRequestInteractor)
    private readonly create_follow_user_request_interactor: CreateFollowUserRequestInteractor,
    @Inject(UserDITokens.UpdateFollowUserRequestInteractor)
    private readonly update_follow_user_request_interactor: UpdateFollowUserRequestInteractor,
    @Inject(UserDITokens.DeleteFollowUserRequestInteractor)
    private readonly delete_follow_user_request_interactor: DeleteFollowUserRequestInteractor,
    @Inject(UserDITokens.GetFollowUserRequestCollectionInteractor)
    private readonly get_follow_user_request_collection_interactor: GetFollowUserRequestCollectionInteractor
  ) {}

  @Post('account')
  @ApiCreatedResponse({ description: 'User account has been successfully created' })
  @ApiForbiddenResponse({ description: 'Invalid sign up data format' })
  @ApiConflictResponse({ description: 'Tried to create an account that already exists' })
  @HttpCode(HttpStatus.CREATED)
  public async createUserAccount(
  @Body(new ValidationPipe()) create_user_account_details: CreateUserAccountDTO): Promise<CreateUserAccountResponseDTO> {
    try {
      const result = await this.create_user_account_interactor.execute(
        CreateUserAccountMapper.toInputModel(create_user_account_details)
      );
      return CreateUserAccountMapper.toResponseDTO(result);
    } catch (e) {
      throw HttpExceptionMapper.toHttpException(e);
    }
  }

  @Get('account/:user_id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'User account data successfully retrieved' })
  @ApiNotFoundResponse({ description: 'User does not exist' })
  public async queryUserAccount(@Param('user_id') user_id: string) {
    try {
      return await this.query_user_account_interactor.execute({ id: user_id });
    } catch (e) {
      throw HttpExceptionMapper.toHttpException(e);
    }
  }

  @Patch('account/:user_id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'User account successfully updated' })
  @ApiForbiddenResponse({ description: 'Invalid update data format' })
  @ApiConflictResponse({ description: 'An account with the email provided already exists' })
  public async updateAccount(
    @Param('user_id') user_id: string,
    @Body(new ValidationPipe()) update_user_account_details: UpdateUserAccountDTO,
  ): Promise<UpdateUserAccountResponseDTO> {
    try {
      return UpdateUserAccountMapper.toResponseDTO(
        await this.update_user_account_interactor.execute(
          UpdateUserAccountMapper.toInputModel(
            user_id,
            update_user_account_details,
          ),
        ),
      );
    } catch (e) {
      throw HttpExceptionMapper.toHttpException(e);
    }
  }

  @Delete('account/:user_id')
  @HttpCode(HttpStatus.OK)
  public async deleteUserAccount(
    @Param('user_id') user_id: string,
  ) {
    try {
      return await this.delete_user_account_interactor.execute({ id: user_id });
    } catch (e) {
      throw HttpExceptionMapper.toHttpException(e);
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ description: 'Search has been successfully completed' })
  @ApiBadRequestResponse({ description: 'Invalid data format' })
  @ApiBadGatewayResponse({ description: 'Error while searching users' })
  public async searchUsers(
    @Query('email') email: string,
    @Query('name') name: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number
  ) {
    try {
      return await this.search_users_interactor.execute(
        await SearchUsersMapper.toInputModel(email, name, {
          limit: limit ? limit : 100,
          offset: offset ? offset : 0
        })
      );
    } catch (e) {
      throw HttpExceptionMapper.toHttpException(e);
    }
  }

  @Get(':user_id/follow')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    description: 'Follow Requests has been successfully found',
  })
  @ApiBadRequestResponse({ description: 'Invalid data format' })
  @ApiBadGatewayResponse({
    description: 'Error while finding user follow requests',
  })
  public async getFollowUserRequestCollection(
    @Param('user_id') user_id: string
  ) {
    try {
      return await this.get_follow_user_request_collection_interactor.execute({
        id: user_id
      });
    } catch (e) {
      throw HttpExceptionMapper.toHttpException(e);
    }
  }

  @Post(':user_id/follow/:user_to_follow_id')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    description: 'Follow Request has been successfully created',
  })
  @ApiBadRequestResponse({ description: 'Invalid data format' })
  @ApiBadGatewayResponse({ description: 'Error while creating follow user request' })
  public async createFollowUserRequest(
    @Param('user_id') user_id: string,
    @Param('user_to_follow_id') user_to_follow_id: string,
  ) {
    try {
      return await this.create_follow_user_request_interactor.execute({
        user_that_requests_id: user_id,
        user_to_follow_id,
      });
    } catch (e) {
      throw HttpExceptionMapper.toHttpException(e);
    }
  }

  @Patch(':user_id/follow/:user_that_requests_id')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ description: 'Follow Request has been successfully updated' })
  @ApiBadRequestResponse({ description: 'Invalid data format' })
  @ApiBadGatewayResponse({ description: 'Error while updating follow user request' })
  public async updateFollowUserRequest(
    @Param('user_id') user_id: string,
    @Param('user_that_requests_id') user_that_requests_id: string,
    @Body('accept') accept: boolean
  ) {
    try {
      return await this.update_follow_user_request_interactor.execute({
        user_to_follow_id: user_id,
        user_that_requests_id,
        accept
      });
    } catch (e) {
      throw HttpExceptionMapper.toHttpException(e);
    }
  }

  @Delete(':user_id/follow/:user_to_follow_id')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ description: 'Follow Request or Relationship has been successfully deleted' })
  @ApiBadRequestResponse({ description: 'Invalid data format' })
  @ApiBadGatewayResponse({ description: 'Error while deleting follow user request' })
  public async deleteFollowUserRequest(
    @Param('user_id') user_id: string,
    @Param('user_to_follow_id') user_to_follow_id: string,
    @Query('is_follow_request') is_follow_request: boolean,
  ) {
    try {
      return await this.delete_follow_user_request_interactor.execute({
        user_that_requests_id: user_id,
        user_to_follow_id,
        is_follow_request,
      });
    } catch (e) {
      throw HttpExceptionMapper.toHttpException(e);
    }
  }
}
