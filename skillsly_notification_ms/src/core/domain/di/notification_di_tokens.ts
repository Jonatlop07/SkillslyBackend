export class NotificationDITokens {
  public static readonly CreateNotificationInteractor: unique symbol = Symbol(
    'CreateNotificationService',
  );
  public static readonly QueryNotificationsInteractor: unique symbol = Symbol(
    'QueryNotificationsService',
  );
  public static readonly NotificationRepository: unique symbol = Symbol(
    'NotificationRepository',
  );
  public static readonly NotificationMessageClient: unique symbol = Symbol(
    'NotificationMessageClient',
  );
}
