export class StoryDITokens {
  public static readonly QueryStoryService: unique symbol = Symbol('QueryStoryService');
  public static readonly QueryStoryCollectionService: unique symbol = Symbol('QueryStoryCollectionService');
  public static readonly CreateStoryService: unique symbol = Symbol('CreateStoryService');
  public static readonly DeleteStoryService: unique symbol = Symbol('DeleteStoryService');
}
