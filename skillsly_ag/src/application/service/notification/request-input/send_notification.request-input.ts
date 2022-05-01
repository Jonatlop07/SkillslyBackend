import NotificationDetailsModel from '@application/service/notification/model/notification_details.model'

export default interface SendNotificationRequestInput {
  notification_details: NotificationDetailsModel;
}
