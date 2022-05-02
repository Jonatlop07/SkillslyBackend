export class PostDITokens {
  public static readonly CreatePostService: unique symbol = Symbol('CreatePostService');
  public static readonly QueryPostService: unique symbol = Symbol('QueryPostService');
  public static readonly QueryPostCollectionService: unique symbol = Symbol('QueryPostCollectionService');
  public static readonly UpdatedPostService: unique symbol = Symbol('UpdatedPostService');
  public static readonly DeletePostService: unique symbol = Symbol('DeletePostService');
}