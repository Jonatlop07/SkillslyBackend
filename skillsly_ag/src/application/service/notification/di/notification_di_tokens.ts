export class NotificationDITokens {
  public static readonly SendNotificationService: unique symbol = Symbol(
    'SendNotificationService',
  );
  public static readonly QueryNotificationsService: unique symbol = Symbol(
    'QueryNotificationsService',
  );
}
