import QueriedNotificationDTO from '../dto/queried_notification.dto';

export default interface QueryNotificationsOutputModel {
  notifications: Array<QueriedNotificationDTO>;
}
