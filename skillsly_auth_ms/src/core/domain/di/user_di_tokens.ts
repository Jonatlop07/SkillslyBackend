export class UserDITokens {
  public static readonly UserRepository: unique symbol  = Symbol('UserRepository');
  public static readonly CreateUserInteractor: unique symbol = Symbol('CreateUserInteractor');
  public static readonly ValidateCredentialsInteractor: unique symbol = Symbol('ValidateCredentialsInteractor');
  public static readonly UpdateCredentialsInteractor: unique symbol = Symbol('UpdateCredentialsInteractor');
  public static readonly DeleteUserInteractor: unique symbol = Symbol('DeleteUserInteractor');
}
