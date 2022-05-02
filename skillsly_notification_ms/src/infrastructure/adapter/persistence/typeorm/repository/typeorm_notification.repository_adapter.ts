import NotificationRepository from '@core/domain/use-case/repository/notification.repository';
import NotificationDetails from '@core/domain/use-case/dto/notification_details';
import NotificationDTO from '@core/domain/use-case/dto/notification.dto';
import { Inject, Logger } from '@nestjs/common';
import { TypeOrmDITokens } from '@infrastructure/adapter/persistence/typeorm/di/typeorm_di_tokens';
import { TypeOrmNotificationRepository } from '@infrastructure/adapter/persistence/typeorm/repository/typeorm_notification.repository';
import { TypeOrmNotificationResourceRepository } from '@infrastructure/adapter/persistence/typeorm/repository/typeorm_notification_resource.repository';
import { TypeOrmNotificationChangeRepository } from '@infrastructure/adapter/persistence/typeorm/repository/typeorm_notification_change.repository';
import NotificationQueryParams from '@core/domain/use-case/dto/query_params';
import QueriedNotificationDTO from '@core/domain/use-case/dto/queried_notification.dto';
import { TypeOrmNotification } from '../entity/typeorm_notification';
import { NotificationResourceType } from '@core/domain/entity/notification_resource_type.enum';

export class TypeOrmNotificationRepositoryAdapter
  implements NotificationRepository
{
  private readonly logger: Logger = new Logger(
    TypeOrmNotificationRepositoryAdapter.name,
  );

  constructor(
    @Inject(TypeOrmDITokens.NotificationRepository)
    private readonly notification_repository: TypeOrmNotificationRepository,
    @Inject(TypeOrmDITokens.NotificationResourceRepository)
    private readonly notification_resource_repository: TypeOrmNotificationResourceRepository,
    @Inject(TypeOrmDITokens.NotificationChangeRepository)
    private readonly notification_change_repository: TypeOrmNotificationChangeRepository,
  ) {}

  public async create(
    notification_details: NotificationDetails,
  ): Promise<Array<NotificationDTO>> {
    const { id, created_at } = await this.notification_resource_repository.save(
      this.notification_resource_repository.create({
        resource_type: notification_details.resource_type as string,
        created_at: new Date(),
        status: 1,
      }),
    );
    await this.notification_change_repository.save(
      this.notification_change_repository.create({
        actor_id: notification_details.actor_id,
        notification_resource_id: id,
        status: 1,
      }),
    );
    return (
      await Promise.all(
        notification_details.notifier_ids.map((notifier_id) =>
          this.notification_repository.save(
            this.notification_repository.create({
              notifier_id: notifier_id,
              notification_resource_id: id,
              status: 1,
            }),
          ),
        ),
      )
    ).map((notification) => ({
      id: notification.id,
      notifier_id: notification.notifier_id,
      actor_id: notification_details.actor_id,
      resource_type: notification_details.resource_type,
      entity_id: notification_details.entity_id,
      created_at,
      status: notification.status,
    }));
  }

  public async findAll(
    query_params: NotificationQueryParams,
  ): Promise<Array<QueriedNotificationDTO>> {
    const { notifier_id, pagination } = query_params;
    const { limit, offset } = pagination;

    const notif = await this.notification_resource_repository
      .createQueryBuilder('notification_resource')
      .leftJoinAndSelect('notification_resource.notifications', 'notification')
      .where('notification.notifier_id = :notifier', { notifier: notifier_id })
      .leftJoinAndSelect(
        'notification_resource.notification_changes',
        'notification_changes',
      )
      .orderBy('notification_resource.created_at', 'DESC')
      .skip(offset)
      .take(limit)
      .getMany();

    const user_notifications = notif.map((notification) => {
      const notification_entity = notification.notifications[0];
      const notification_change = notification.notification_changes[0];
      return {
        notifier_id: notification_entity.notifier_id,
        actor_id: notification_change.actor_id,
        created_at: notification.created_at,
        resource_type: notification.resource_type as NotificationResourceType,
        entity_id: '',
      };
    });
    return user_notifications;
  }
}
