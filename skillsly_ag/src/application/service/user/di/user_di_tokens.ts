export class UserDITokens {
  public static readonly CreateUserService: unique symbol = Symbol('CreateUserService');
  public static readonly QueryUserService: unique symbol = Symbol('QueryUserService');
  public static readonly UpdateAccountService: unique symbol = Symbol('UpdateAccountService');
  public static readonly DeleteAccountService: unique symbol = Symbol('DeleteAccountService');
  public static readonly SearchUsersService: unique symbol = Symbol('SearchUsersService');
}
