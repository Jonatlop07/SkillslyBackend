import CreateNotificationInteractor from '@core/domain/use-case/interactor/create_notification.interactor'
import CreateNotificationInputModel from '@core/domain/use-case/input-model/create_notification.input_model'
import CreateNotificationOutputModel from '@core/domain/use-case/output-model/create_notification.output_model'
import { Inject, Logger } from '@nestjs/common'
import CreateNotificationGateway from '@core/domain/use-case/gateway/create_notification.gateway'
import { NotificationDITokens } from '@core/domain/di/notification_di_tokens'
import NotificationDTO from '@core/domain/use-case/dto/notification.dto'
import NotificationMessageClient from '@core/domain/use-case/message-client/notification.message_client'

export class CreateNotificationService implements CreateNotificationInteractor {
  private readonly logger: Logger = new Logger(CreateNotificationService.name);

  constructor(
    @Inject(NotificationDITokens.NotificationRepository)
    private readonly gateway: CreateNotificationGateway,
    @Inject(NotificationDITokens.NotificationMessageClient)
    private readonly message_client: NotificationMessageClient
  ) {}

  public async execute(input: CreateNotificationInputModel): Promise<CreateNotificationOutputModel> {
    const { notification_details } = input;
    const notifications: Array<NotificationDTO> = await this.gateway.create(notification_details);
    this.logger.log(notifications);
    await Promise.all(
      notifications.map(
        (notification) =>
          this.message_client.sendMessage(notification)
      )
    );

    return {};
  }
}
