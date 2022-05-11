import { Controller, Logger } from '@nestjs/common'
import { NotificationHandlerService } from './notification_handler.service'
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices'
import { MessagePatterns } from './constants/message_patterns'
import NotificationDTO from './dto/notification.dto'

@Controller('notification-handler')
export class NotificationHandlerController {
  private logger: Logger = new Logger(NotificationHandlerController.name);

  constructor(private readonly service: NotificationHandlerService) {}

  @MessagePattern(MessagePatterns.NotificationCreated)
  public async notificationCreated(
    @Payload() notification: NotificationDTO,
    @Ctx() context: RmqContext
  ): Promise<void> {
    const channel = context.getChannelRef();
    const sent: boolean = await this.service.sendNotification(notification);
    if (sent) {
      channel.ack(context.getMessage());
    }
  }
}
