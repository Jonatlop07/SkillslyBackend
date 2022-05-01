import NotificationDTO from '@core/domain/use-case/dto/notification.dto'

export default interface NotificationMessageClient {
  sendMessage(notification_details: NotificationDTO): Promise<void>;
}
