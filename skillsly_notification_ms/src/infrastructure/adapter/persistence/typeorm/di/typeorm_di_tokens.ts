export class TypeOrmDITokens {
  public static readonly NotificationRepository: unique symbol = Symbol('NotificationRepository');
  public static readonly NotificationResourceRepository: unique symbol = Symbol('NotificationResourceRepository');
  public static readonly NotificationChangeRepository: unique symbol = Symbol('NotificationChangeRepository');
}
