import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from '@application/api/graphql/model/user/user'
import { SearchParams } from '@application/api/graphql/model/user/input/search_params'
import { Inject, Logger } from '@nestjs/common'
import { SearchUsersService } from '@application/service/user/requester/search_users.service'
import { UserMapper } from '@application/api/graphql/mapper/user.mapper'
import { UserDITokens } from '@application/service/user/di/user_di_tokens'
import { FollowRelationships } from '@application/api/graphql/model/user/follow_relationships'
import { Id } from '@application/common/type/common_types'
import { QueryFollowRelationshipsService } from '@application/service/user/requester/query_follow_relationships.service'
import { FollowRelationshipsMapper } from '@application/api/graphql/mapper/follow_relationships.mapper'
import { FollowRequestDetails } from '@application/api/graphql/model/user/follow_request_details'
import { CreateFollowUserRequestService } from '@application/service/user/requester/create_follow_user_request.service'
import { FollowRequestDetailsMapper } from '@application/api/graphql/mapper/follow_request_details.mapper'
import { GraphQLBoolean } from 'graphql'
import { UpdateFollowUserRequestService } from '@application/service/user/requester/update_follow_user_request.service'
import { DeleteFollowUserRequestService } from '@application/service/user/requester/delete_follow_user_request.service'

@Resolver(() => User)
export class SocialResolver {
  private readonly logger: Logger = new Logger(SocialResolver.name);

  constructor(
    @Inject(UserDITokens.SearchUsersService)
    private readonly search_users_service: SearchUsersService,
    @Inject(UserDITokens.QueryFollowRelationshipsService)
    private readonly query_follow_relationships_service: QueryFollowRelationshipsService,
    @Inject(UserDITokens.CreateFollowUserRequestService)
    private readonly create_follow_user_request_service: CreateFollowUserRequestService,
    @Inject(UserDITokens.UpdateFollowUserRequestService)
    private readonly update_follow_user_request_service: UpdateFollowUserRequestService,
    @Inject(UserDITokens.DeleteFollowUserRequestService)
    private readonly delete_follow_user_request_service: DeleteFollowUserRequestService
  ) {}

  @Query(() => [User])
  public async users(@Args({ name: 'search_params', type: () => SearchParams }) search_params: SearchParams) {
    this.logger.log(`Searching user in user service...`);
    const { users } = await this.search_users_service.execute({
      ...search_params
    });
    this.logger.log(`Search in user service successfully made`);
    return users.map(UserMapper.toGraphQLModel);
  }

  @Query(() => FollowRelationships)
  public async followRelationships(@Args({ name: 'user_id', type: () => ID }) user_id: Id) {
    this.logger.log('Fetching follow relationships from user service...');
    const { follow_request_collection } = await this.query_follow_relationships_service.execute({
      user_id
    });
    this.logger.log('Follow relationships successfully fetched from user service');
    return FollowRelationshipsMapper.toGraphQLModel(follow_request_collection);
  }

  @Mutation(() => FollowRequestDetails)
  public async createFollowRequest(
    @Args({ name: 'user_id' , type: () => ID }) user_id: Id,
    @Args({ name: 'user_to_follow_id' , type: () => ID }) user_to_follow_id: Id
  ) {
    this.logger.log('Creating follow request in user service...');
    const { user_details: request_details } = await this.create_follow_user_request_service.execute({
      user_id,
      user_to_follow_id
    });
    this.logger.log('Follow request successfully created in user service');
    return FollowRequestDetailsMapper.toGraphQLModel(request_details);
  }

  @Mutation(() => FollowRequestDetails)
  public async updateFollowRequest(
    @Args({ name: 'user_id', type: () => ID}) user_id: Id,
    @Args({ name: 'user_that_requests_id', type: () => ID}) user_that_requests_id: Id,
    @Args({ name: 'accept', type: () => GraphQLBoolean }) accept: boolean
  ) {
    this.logger.log('Updating follow request in user service...');
    const { user_details: request_details } = await this.update_follow_user_request_service.execute({
      user_id,
      user_that_requests_id,
      accept
    });
    this.logger.log('Follow request successfully updated in user service');
    return FollowRequestDetailsMapper.toGraphQLModel(request_details);
  }

  @Mutation(() => FollowRequestDetails)
  public async deleteFollowRequest(
    @Args({ name: 'user_id', type: () => ID}) user_id: Id,
    @Args({ name: 'user_to_follow_id', type: () => ID}) user_to_follow_id: Id,
    @Args({ name: 'is_follow_request', type: () => GraphQLBoolean }) is_follow_request: boolean
  ) {
    this.logger.log('Deleting follow request in user service...');
    const { user_details: request_details } = await this.delete_follow_user_request_service.execute({
      user_id,
      user_to_follow_id,
      is_follow_request
    });
    this.logger.log('Follow request successfully deleted in user service');
    return FollowRequestDetailsMapper.toGraphQLModel(request_details);
  }
}
