import NotificationMessageQueueClient
  from '@core/domain/use-case/message-client/notification.message_client'
import { firstValueFrom } from 'rxjs'
import { Inject } from '@nestjs/common'
import { RabbitMQDITokens } from '@infrastructure/adapter/messaging/rabbit-mq/di/rabbit_mq_di_tokens'
import { ClientProxy } from '@nestjs/microservices'
import NotificationDTO from '@core/domain/use-case/dto/notification.dto'
import MessagePatterns from '@infrastructure/adapter/messaging/rabbit-mq/message_patterns'

export class RabbitMQNotificationMessageClientAdapter implements NotificationMessageQueueClient {
  constructor(
    @Inject(RabbitMQDITokens.RabbitMQMessageClient)
    private readonly client_proxy: ClientProxy
  ) {}

  public async sendMessage(notification: NotificationDTO): Promise<void> {
    await firstValueFrom(
      this.client_proxy.emit(MessagePatterns.NotificationCreated, notification)
    );
  }
}
