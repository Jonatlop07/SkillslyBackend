export class InnerCommentDITokens {
  public static readonly CreateInnerCommentService: unique symbol = Symbol(
    'CreateInnerCommentService',
  );
  public static readonly QueryInnerCommentsService: unique symbol = Symbol(
    'QueryInnerCommentsService',
  );
  public static readonly UpdateInnerCommentService: unique symbol = Symbol(
    'UpdateInnerCommentService',
  );
  public static readonly DeleteInnerCommentService: unique symbol = Symbol(
    'DeleteInnerCommentService',
  );
  public static readonly DeleteInnerCommentsByOwnerService: unique symbol =
    Symbol('DeleteInnerCommentsByOwnerService');
}
