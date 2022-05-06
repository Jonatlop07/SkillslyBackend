import { Injectable, Logger } from '@nestjs/common'
import NotificationDTO from './dto/notification.dto'
import { NotificationHandlerGateway } from './notification_handler.gateway'

@Injectable()
export class NotificationHandlerService {
  private readonly logger: Logger = new Logger(NotificationHandlerService.name);

  constructor(private readonly web_socket: NotificationHandlerGateway) {}

  public async sendNotification(notification: NotificationDTO): Promise<boolean> {
    return await this.web_socket.sendNotification(notification);
  }
}
