import { Controller, Logger } from '@nestjs/common'
import { NotificationHandlerService } from './notification_handler.service'
import { MessagePattern } from '@nestjs/microservices'
import { MessagePatterns } from './constants/message_patterns'
import NotificationDTO from './dto/notification.dto'

@Controller('notification-handler')
export class NotificationHandlerController {
  private logger: Logger = new Logger(NotificationHandlerController.name);

  constructor(private readonly service: NotificationHandlerService) {}

  @MessagePattern(MessagePatterns.NotificationCreated)
  public async notificationCreated(notification: NotificationDTO): Promise<void> {
    await this.service.sendNotification(notification);
  }
}
