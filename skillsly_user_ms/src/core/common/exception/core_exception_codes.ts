export class CoreExceptionCodes {
  public static readonly ACCOUNT_ALREADY_EXISTS: unique symbol = Symbol('ACCOUNT_ALREADY_EXISTS');
  public static readonly INVALID_ACCOUNT_DATA_FORMAT: unique symbol = Symbol('INVALID_ACCOUNT_DATA_FORMAT');
  public static readonly NON_EXISTENT_USER: unique symbol = Symbol('NON_EXISTENT_USER');
  public static readonly USER_FOLLOW_REQUEST_ALREADY_EXISTS: unique symbol = Symbol('USER_FOLLOW_REQUEST_ALREADY_EXISTS');
  public static readonly NON_EXISTENT_FOLLOW_USER_REQUEST: unique symbol = Symbol('NON_EXISTENT_FOLLOW_USER_REQUEST');
  public static readonly INVALID_FORMAT_FOLLOW_USER_REQUEST: unique symbol = Symbol('INVALID_FORMAT_FOLLOW_USER_REQUEST');
  public static readonly NON_EXISTENT_USER_FOLLOW_RELATIONSHIP: unique symbol = Symbol('NON_EXISTENT_USER_FOLLOW_RELATIONSHIP');
}
