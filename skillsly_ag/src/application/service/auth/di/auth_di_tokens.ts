export class AuthDITokens {
  public static readonly QueryUserService: unique symbol = Symbol('AuthQueryUserService');
  public static readonly CreateUserService: unique symbol = Symbol('AuthCreateUserService');
  public static readonly UpdateCredentialsService: unique symbol = Symbol('AuthUpdateCredentialsService');
  public static readonly UpdateUserService: unique symbol = Symbol('AuthUpdateUserService');
  public static readonly ValidateCredentialsService: unique symbol = Symbol('AuthValidateCredentialsService');
  public static readonly DeleteUserService: unique symbol = Symbol('DeleteUserService');
  public static readonly RequestResetPasswordService: unique symbol = Symbol('RequestResetPasswordService');
  public static readonly ResetPasswordService: unique symbol = Symbol('ResetPasswordService');
}
