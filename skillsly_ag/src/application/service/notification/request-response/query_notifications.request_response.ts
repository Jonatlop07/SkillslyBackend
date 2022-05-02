import UserNotificationModel from '../model/user_notification.model';

export default interface QueryNotificationsRequestResponse {
  notifications: Array<UserNotificationModel>;
}
