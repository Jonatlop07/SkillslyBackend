export class TypeOrmDITokens {
  public static readonly UserRepository: unique symbol = Symbol('UserRepository');
  public static readonly UserRelationshipRepository: unique symbol = Symbol('UserRelationshipRepository');
}
