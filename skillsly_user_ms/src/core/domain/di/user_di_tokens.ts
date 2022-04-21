export class UserDITokens {
  public static readonly UserRepository: unique symbol  = Symbol('UserRepository');
  public static readonly UserRelationshipRepository: unique symbol  = Symbol('UserRelationshipRepository');
  public static readonly CreateUserAccountInteractor: unique symbol = Symbol('CreateUserAccountInteractor');
  public static readonly QueryUserAccountInteractor: unique symbol = Symbol('QueryUserAccountInteractor');
  public static readonly UpdateUserAccountInteractor: unique symbol = Symbol('UpdateUserAccountInteractor');
  public static readonly DeleteUserAccountInteractor: unique symbol = Symbol('DeleteUserAccountInteractor');
  public static readonly SearchUsersInteractor: unique symbol = Symbol('SearchUsersInteractor');
  public static readonly CreateFollowUserRequestInteractor: unique symbol = Symbol('CreateFollowUserRequestInteractor');
  public static readonly UpdateFollowUserRequestInteractor: unique symbol = Symbol('UpdateFollowUserRequestInteractor');
  public static readonly DeleteFollowUserRequestInteractor: unique symbol = Symbol('DeleteFollowUserRequestInteractor');
  public static readonly GetFollowUserRequestCollectionInteractor: unique symbol = Symbol('GetFollowFollowUserRequestCollectionInteractor');
}
