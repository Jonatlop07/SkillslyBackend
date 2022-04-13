export class CoreExceptionCodes {
  public static readonly USER_ALREADY_EXISTS: unique symbol = Symbol('USER_ALREADY_EXISTS');
  public static readonly INVALID_CREDENTIALS_FORMAT: unique symbol = Symbol('INVALID_CREDENTIALS_FORMAT');
  public static readonly INVALID_CREDENTIALS: unique symbol = Symbol('INVALID_CREDENTIALS');
  public static readonly USER_NOT_FOUND: unique symbol = Symbol('USER_NOT_FOUND');
}
