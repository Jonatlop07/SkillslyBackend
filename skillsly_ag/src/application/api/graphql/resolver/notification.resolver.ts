import { Id } from '@application/common/type/common_types';
import { NotificationDITokens } from '@application/service/notification/di/notification_di_tokens';
import { QueryNotificationsService } from '@application/service/notification/requester/query_notifications.service';
import { Logger, Inject } from '@nestjs/common';
import { Resolver, Args, ID, Query } from '@nestjs/graphql';
import { NotificationQueryParams } from '../model/notification/input/query_params';
import { Notifications } from '../model/notification/notification';

@Resolver(() => Notifications)
export class NotificationResolver {
  private readonly logger: Logger = new Logger(NotificationResolver.name);

  constructor(
    @Inject(NotificationDITokens.QueryNotificationsService)
    private readonly query_notifications_service: QueryNotificationsService,
  ) {}

  @Query(() => [Notifications])
  public async queryNotifications(
    @Args({ name: 'notifier_id', type: () => ID }) notifier_id: Id,
    @Args({
      name: 'notifications_pagination',
      type: () => NotificationQueryParams,
    })
    query_params?: NotificationQueryParams,
  ) {
    this.logger.log('Fetching user notifications from notification service...');
    const notifications = await this.query_notifications_service.execute({
      notifier_id,
      limit: query_params.limit,
      offset: query_params.offset,
    });
    this.logger.log(
      'User notifications successfully fetched from notification service',
    );
    return notifications.notifications;
  }
}
