export class AuthDITokens {
  public static readonly CreateUserService: unique symbol = Symbol('AuthCreateUserService');
  public static readonly UpdateCredentialsService: unique symbol = Symbol('AuthUpdateCredentialsService');
  public static readonly DeleteUserService: unique symbol = Symbol('DeleteUserService');
}
