export class CommentDITokens {
  public static readonly CreateCommentService: unique symbol = Symbol(
    'CreateCommentService',
  );
  public static readonly QueryCommentsService: unique symbol = Symbol(
    'QueryCommentsService',
  );
  public static readonly UpdateCommentService: unique symbol = Symbol(
    'UpdateCommentService',
  );
  public static readonly DeleteCommentService: unique symbol = Symbol(
    'DeleteCommentService',
  );
  public static readonly DeleteCommentsByOwnerService: unique symbol = Symbol(
    'DeleteCommentsByOwnerService',
  );
}
