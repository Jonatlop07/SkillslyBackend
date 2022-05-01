import { UserDITokens } from '@core/domain/di/user_di_tokens';
import { Module, Provider } from '@nestjs/common';
import { TypeOrmUserRepositoryAdapter } from '@infrastructure/adapter/persistence/typeorm/repository/typeorm_user.repository_adapter';
import { TypeOrmDITokens } from '@infrastructure/adapter/persistence/typeorm/di/typeorm_di_tokens';
import { Connection } from 'typeorm';
import { TypeOrmUserRepository } from '@infrastructure/adapter/persistence/typeorm/repository/typeorm_user.repository';
import { ConfigModule } from '@nestjs/config';
import { UserController } from '@application/api/http-rest/controller/user.controller'
import { TypeOrmUserRelationshipRepositoryAdapter } from '@infrastructure/adapter/persistence/typeorm/repository/typeorm_user_relationship.repository_adapter'
import { TypeOrmUserRelationshipRepository } from '@infrastructure/adapter/persistence/typeorm/repository/typeorm_user_relationship.repository'
import { CreateUserAccountService } from '@core/service/account/create_user_account.service'
import { UpdateUserAccountService } from '@core/service/account/update_user_account.service'
import { DeleteUserAccountService } from '@core/service/account/delete_user_account.service'
import { QueryUserAccountService } from '@core/service/account/query_user_account.service'
import { SearchUsersService } from '@core/service/search/search_users.service'
import { CreateFollowUserRequestService } from '@core/service/follow_request/create_follow_user_request.service'
import { UpdateFollowUserRequestService } from '@core/service/follow_request/update_follow_user_request.service'
import { DeleteFollowUserRequestService } from '@core/service/follow_request/delete_follow_user_request.service'
import { GetFollowUserRequestCollectionService } from '@core/service/follow_request/get_user_follow_request_collection.service'

const persistence_providers: Array<Provider> = [
  {
    provide: UserDITokens.UserRepository,
    useFactory: (repository) => new TypeOrmUserRepositoryAdapter(repository),
    inject: [TypeOrmDITokens.UserRepository]
  },
  {
    provide: UserDITokens.UserRelationshipRepository,
    useFactory: (relationship_repository, user_repository) =>
      new TypeOrmUserRelationshipRepositoryAdapter(relationship_repository, user_repository),
    inject: [TypeOrmDITokens.UserRelationshipRepository, TypeOrmDITokens.UserRepository]
  },
  {
    provide: TypeOrmDITokens.UserRepository,
    useFactory: connection => connection.getCustomRepository(TypeOrmUserRepository),
    inject: [Connection]
  },
  {
    provide: TypeOrmDITokens.UserRelationshipRepository,
    useFactory: connection => connection.getCustomRepository(TypeOrmUserRelationshipRepository),
    inject: [Connection]
  },
];

const use_case_providers: Array<Provider> = [
  {
    provide: UserDITokens.CreateUserAccountInteractor,
    useFactory: (gateway) => new CreateUserAccountService(gateway),
    inject: [UserDITokens.UserRepository]
  },
  {
    provide: UserDITokens.UpdateUserAccountInteractor,
    useFactory: (gateway) => new UpdateUserAccountService(gateway),
    inject: [UserDITokens.UserRepository]
  },
  {
    provide: UserDITokens.DeleteUserAccountInteractor,
    useFactory: (gateway) => new DeleteUserAccountService(gateway),
    inject: [UserDITokens.UserRepository]
  },
  {
    provide: UserDITokens.QueryUserAccountInteractor,
    useFactory: (gateway) => new QueryUserAccountService(gateway),
    inject: [UserDITokens.UserRepository]
  },
  {
    provide: UserDITokens.SearchUsersInteractor,
    useFactory: (gateway) => new SearchUsersService(gateway),
    inject: [UserDITokens.UserRepository]
  },
  {
    provide: UserDITokens.CreateFollowUserRequestInteractor,
    useFactory: (gateway) => new CreateFollowUserRequestService(gateway),
    inject: [UserDITokens.UserRelationshipRepository]
  },
  {
    provide: UserDITokens.UpdateFollowUserRequestInteractor,
    useFactory: (gateway) => new UpdateFollowUserRequestService(gateway),
    inject: [UserDITokens.UserRelationshipRepository]
  },
  {
    provide: UserDITokens.DeleteFollowUserRequestInteractor,
    useFactory: (gateway) => new DeleteFollowUserRequestService(gateway),
    inject: [UserDITokens.UserRelationshipRepository]
  },
  {
    provide: UserDITokens.GetFollowUserRequestCollectionInteractor,
    useFactory: (gateway) => new GetFollowUserRequestCollectionService(gateway),
    inject: [UserDITokens.UserRelationshipRepository]
  },
];

@Module({
  controllers: [UserController],
  imports: [
    ConfigModule
  ],
  providers: [
    ...persistence_providers,
    ...use_case_providers,
  ]
})
export class UserModule {}
