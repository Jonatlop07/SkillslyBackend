import CreateNotificationGateway from '@core/domain/use-case/gateway/create_notification.gateway';
import QueryNotificationsGateway from '../gateway/query_notifications.gateway';

export default interface NotificationRepository
  extends CreateNotificationGateway,
    QueryNotificationsGateway {}
