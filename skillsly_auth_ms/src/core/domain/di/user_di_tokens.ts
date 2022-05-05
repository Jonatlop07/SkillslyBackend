export class UserDITokens {
  public static readonly UserRepository: unique symbol  = Symbol('UserRepository');
  public static readonly MailRepository: unique symbol  = Symbol('MailRepository');
  public static readonly CreateUserInteractor: unique symbol = Symbol('CreateUserInteractor');
  public static readonly ValidateCredentialsInteractor: unique symbol = Symbol('ValidateCredentialsInteractor');
  public static readonly UpdateCredentialsInteractor: unique symbol = Symbol('UpdateCredentialsInteractor');
  public static readonly UpdateUserInteractor: unique symbol = Symbol('UpdateUserInteractor');
  public static readonly DeleteUserInteractor: unique symbol = Symbol('DeleteUserInteractor');
  public static readonly QueryUserInteractor: unique symbol = Symbol('QueryUserInteractor');
  public static readonly RequestResetPasswordInteractor: unique symbol = Symbol('RequestResetPasswordInteractor');
  public static readonly ResetPasswordInteractor: unique symbol = Symbol('ResetPasswordInteractor');
}
