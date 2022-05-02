import { CreateAccountService as AuthCreateAccountService } from '@application/service/auth/requester/create_account.service';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@application/api/graphql/model/user/user';
import { CreateAccountService as UserCreateAccountService } from '@application/service/user/requester/create_account.service';
import { NewUser } from '@application/api/graphql/model/user/input/new_user';
import { UserMapper } from '@application/api/graphql/mapper/user.mapper';
import { QueryUserService } from '@application/service/user/requester/query_user.service';
import { Inject, Logger } from '@nestjs/common';
import { AuthDITokens } from '@application/service/auth/di/auth_di_tokens';
import { UserDITokens } from '@application/service/user/di/user_di_tokens';
import { UserAccountUpdates } from '@application/api/graphql/model/user/input/user_account_updates';
import { UpdateCredentialsService } from '@application/service/auth/requester/update_credentials.service';
import { UpdateAccountService } from '@application/service/user/requester/update_account.service';
import { Id } from '@application/common/type/common_types';
import { DeleteUserService } from '@application/service/auth/requester/delete_user.service';
import { DeleteAccountService } from '@application/service/user/requester/delete_account.service';
import { QueryFollowRelationshipsService } from '@application/service/user/requester/query_follow_relationships.service';
import { StoryDITokens } from '@application/service/story/di/story_di_tokens';
import { DeleteUserStoryCollectionService } from '@application/service/story/requester/delete_user_story_collection.service';

@Resolver(() => User)
export class AccountResolver {
  private readonly logger: Logger = new Logger(AccountResolver.name);

  constructor(
    @Inject(AuthDITokens.CreateUserService)
    private readonly auth_create_account_service: AuthCreateAccountService,
    @Inject(UserDITokens.CreateUserService)
    private readonly user_create_account_service: UserCreateAccountService,
    @Inject(UserDITokens.QueryUserService)
    private readonly query_user_service: QueryUserService,
    @Inject(AuthDITokens.UpdateCredentialsService)
    private readonly update_credentials_service: UpdateCredentialsService,
    @Inject(UserDITokens.UpdateAccountService)
    private readonly update_account_service: UpdateAccountService,
    @Inject(AuthDITokens.DeleteUserService)
    private readonly delete_user_service: DeleteUserService,
    @Inject(UserDITokens.DeleteAccountService)
    private readonly delete_account_service: DeleteAccountService,
    @Inject(UserDITokens.QueryFollowRelationshipsService)
    private readonly query_follow_relationships_service: QueryFollowRelationshipsService,
    @Inject(StoryDITokens.DeleteStoryCollectionService)
    private readonly delete_story_collection_service: DeleteUserStoryCollectionService,
  ) {}

  @Mutation(() => User)
  public async createUserAccount(
  @Args({
    name: 'account_details',
    type: () => NewUser
  }) account_details: NewUser
  ) {
    this.logger.log('Creating user in auth service...');
    const { id } = await this.auth_create_account_service.execute({
      email: account_details.email,
      password: account_details.password
    });
    this.logger.log('User in auth service successfully created');
    this.logger.log('Creating user account in user service...');
    const { created_account } = await this.user_create_account_service.execute({
      id,
      ...account_details
    });
    this.logger.log('User account in user service successfully created');
    return UserMapper.toGraphQLModel(created_account);
  }

  @Query(() => User)
  public async user(@Args({ name: 'id' }) id: Id) {
    this.logger.log('Querying user in user service...');
    const { account_details } = await this.query_user_service.execute({ id });
    this.logger.log('User successfully queried in user service...');
    return UserMapper.toGraphQLModel(account_details);
  }

  @Mutation(() => User)
  public async updateUserAccount(
  @Args({ name: 'user_id', type: () => ID }) user_id: Id,
    @Args({ name: 'updates', type: () => UserAccountUpdates }) updates: UserAccountUpdates
  ) {
    if (updates.email) {
      this.logger.log('Updating credentials in auth service...');
      await this.update_credentials_service.execute({
        user_id,
        email: updates.email
      });
      this.logger.log('Credentials in auth service successfully updated');
    }
    this.logger.log('Updating account in user service...');
    const { updated_account } = await this.update_account_service.execute({
      user_id,
      ...updates
    });
    this.logger.log('Account in user service successfully updated');
    return UserMapper.toGraphQLModel(updated_account);
  }

  @Mutation(() => User)
  public async deleteUserAccount(
  @Args({ name: 'user_id', type: () => ID }) user_id: Id,
    @Args({ name: 'password', nullable: true }) password: string
  ) {
    this.logger.log('Deleting user in auth service...');
    await this.delete_user_service.execute({
      user_id,
      password
    });
    this.logger.log('User in auth service successfully deleted');
    this.logger.log('Deleting user account in user service...');
    const { deleted_user } = await this.delete_account_service.execute({
      user_id
    });
    this.logger.log('User account in user service successfully deleted');
    this.logger.log('Deleting user stories in story service...');
    const response = await this.delete_story_collection_service.execute({
      owner_id: user_id
    });
    this.logger.log(`Deleted stories: ${response}`);
    this.logger.log('User stories in story service successfully deleted');
    return UserMapper.toGraphQLModel(deleted_user);
  }
}
