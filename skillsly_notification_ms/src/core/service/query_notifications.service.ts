import { Inject, Logger } from '@nestjs/common';
import { NotificationDITokens } from '@core/domain/di/notification_di_tokens';
import QueryNotificationsInteractor from '@core/domain/use-case/interactor/query_notifications.interactor';
import QueryNotificationsGateway from '@core/domain/use-case/gateway/query_notifications.gateway';
import QueryNotificationsOutputModel from '@core/domain/use-case/output-model/query_notifications.output_model';
import QueryNotificationsInputModel from '@core/domain/use-case/input-model/query_notifications.input_model';
import QueriedNotificationDTO from '@core/domain/use-case/dto/queried_notification.dto';

export class QueryNotificationsService implements QueryNotificationsInteractor {
  private readonly logger: Logger = new Logger(QueryNotificationsService.name);

  constructor(
    @Inject(NotificationDITokens.NotificationRepository)
    private readonly gateway: QueryNotificationsGateway,
  ) {}

  public async execute(
    input: QueryNotificationsInputModel,
  ): Promise<QueryNotificationsOutputModel> {
    const { notifier_id, pagination } = input.query_details;
    const notifications: Array<QueriedNotificationDTO> =
      await this.gateway.findAll({ notifier_id, pagination });

    return { notifications };
  }
}
