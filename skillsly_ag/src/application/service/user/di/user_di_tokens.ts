export class UserDITokens {
  public static readonly CreateUserService: unique symbol =
    Symbol('CreateUserService');
  public static readonly QueryUserService: unique symbol =
    Symbol('QueryUserService');
  public static readonly UpdateAccountService: unique symbol = Symbol(
    'UpdateAccountService',
  );
  public static readonly DeleteAccountService: unique symbol = Symbol(
    'DeleteAccountService',
  );
  public static readonly SearchUsersService: unique symbol =
    Symbol('SearchUsersService');
  public static readonly CreateFollowUserRequestService: unique symbol = Symbol(
    'CreateFollowUserRequestService',
  );
  public static readonly DeleteFollowUserRequestService: unique symbol = Symbol(
    'DeleteFollowUserRequestService',
  );
  public static readonly UpdateFollowUserRequestService: unique symbol = Symbol(
    'UpdateFollowUserRequestService',
  );
  public static readonly QueryFollowRelationshipsService: unique symbol =
    Symbol('QueryFollowRelationshipsService');
}
