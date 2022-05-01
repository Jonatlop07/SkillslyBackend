import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Story } from '@application/api/graphql/model/story/story';
import { Id } from '@application/common/type/common_types'
import { Inject, Logger } from '@nestjs/common'
import { StoryDITokens } from '@application/service/story/di/story_di_tokens'
import { QueryStoryService } from '@application/service/story/requester/query_story.service'
import { StoryMapper } from '@application/api/graphql/mapper/story.mapper'
import { StoryDetails } from '@application/api/graphql/model/story/input/story_details'
import { CreateStoryService } from '@application/service/story/requester/create_story.service'
import { DeleteStoryService } from '@application/service/story/requester/delete_story.service'
import { UserDITokens } from '@application/service/user/di/user_di_tokens'
import { QueryFollowRelationshipsService } from '@application/service/user/requester/query_follow_relationships.service'
import { QueryUserStoryCollectionService } from '@application/service/story/requester/query_user_story_collection.service'
import QueryUserStoryCollectionRequestResponse
  from '@application/service/story/request-response/query_user_story_collection.request_response'
import { FollowingUsersStories } from '@application/api/graphql/model/story/following_users_stories'
import { FollowingUsersStoriesMapper } from '@application/api/graphql/mapper/following_users_stories.mapper'
import {
  NotificationResourceType
} from '@application/service/notification/model/notification_resource_type.enum'
import { NotificationDITokens } from '@application/service/notification/di/notification_di_tokens'
import { SendNotificationService } from '@application/service/notification/requester/send_notification.service'

@Resolver(() => Story)
export class StoryResolver {
  private readonly logger: Logger = new Logger(StoryResolver.name);

  constructor(
    @Inject(StoryDITokens.CreateStoryService)
    private readonly create_story_service: CreateStoryService,
    @Inject(StoryDITokens.DeleteStoryService)
    private readonly delete_story_service: DeleteStoryService,
    @Inject(StoryDITokens.QueryStoryService)
    private readonly query_story_service: QueryStoryService,
    @Inject(StoryDITokens.QueryStoryCollectionService)
    private readonly query_story_collection_service: QueryUserStoryCollectionService,
    @Inject(UserDITokens.QueryFollowRelationshipsService)
    private readonly query_follow_relationships_service: QueryFollowRelationshipsService,
    @Inject(NotificationDITokens.SendNotificationService)
    private readonly send_notification_service: SendNotificationService
  ) {
  }

  @Query(() => Story)
  public async story(
    @Args({ name: 'id', type: () => ID }) story_id: Id,
    @Args({ name: 'viewer_id', type: () => ID }) viewer_id: Id
  ) {
    this.logger.log('Querying a story in story service...');
    const { story } = await this.query_story_service.execute({
      story_id,
      viewer_id
    });
    this.logger.log('Story queried successfully in story service');
    this.logger.log('Story viewed notification in notification service...');
    await this.send_notification_service.execute({
      notification_details: {
        resource_type: NotificationResourceType.StoryViewed,
        entity_id: story.story_id,
        actor_id: viewer_id,
        notifier_ids: [story.owner_id]
      }
    })
    this.logger.log('Story viewed notification successfully created in notification service');
    return StoryMapper.toGraphQLModel(story);
  }

  @Query(() => [FollowingUsersStories])
  public async storiesOfFollowingUsers(@Args({ name: 'user_id' }) user_id: Id) {
    this.logger.log('Querying following users in user service...');
    const { follow_request_collection: { following_users } } = await this.query_follow_relationships_service.execute({
      user_id
    });
    this.logger.log('Following users successfully queried in user service');
    this.logger.log('Querying stories of following users in story service...');
    const stories_of_following_users_responses: Array<QueryUserStoryCollectionRequestResponse> = await Promise.all(
      following_users.map(
        ({ id }) => this.query_story_collection_service.execute({ owner_id: id })
      )
    );
    this.logger.log('Stories of following users successfully queried in story service');
    return stories_of_following_users_responses.map(
      ({ stories }, index) =>
        FollowingUsersStoriesMapper.toGraphQLModel(following_users[index].id, stories)
    );
  }

  @Mutation(() => Story)
  public async createStory(
    @Args({ name: 'story_details', type: () => StoryDetails }) story_details: StoryDetails) {
    const { owner_id, description, media_locator } = story_details;
    this.logger.log('Creating a story in story service...');
    const { created_story } = await this.create_story_service.execute({
      owner_id,
      description,
      media_locator
    });
    this.logger.log('Story successfully created in story service');
    return StoryMapper.toGraphQLModel(created_story);
  }

  @Mutation(() => Story)
  public async deleteStory(@Args({ name: 'id' }) story_id: Id) {
    this.logger.log('Deleting a story in story service...');
    const { deleted_story } = await this.delete_story_service.execute({ story_id });
    this.logger.log('Story successfully deleted in story service');
    return StoryMapper.toGraphQLModel(deleted_story);
  }
}
