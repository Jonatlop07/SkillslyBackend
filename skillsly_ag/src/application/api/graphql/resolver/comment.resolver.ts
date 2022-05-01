import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, Logger } from '@nestjs/common';
import { Id } from '@application/common/type/common_types';
import { Comment } from '../model/comment/comment';
import { NewComment } from '../model/comment/input/new_comment';
import { CommentDITokens } from '@application/service/comments/comment/di/comment_di_tokens';
import { CreateCommentService } from '@application/service/comments/comment/requester/create_comment.service';
import { CommentMapper } from '../mapper/comment/comment.mapper';
import { QueryCommentsService } from '@application/service/comments/comment/requester/query_comments.service';
import { PaginationParams } from '../model/comment/input/pagination_params';
import { UpdateCommentService } from '@application/service/comments/comment/requester/update_comment.service';
import { CommentContentUpdate } from '../model/comment/input/comment_content_update';
import { DeleteCommentService } from '@application/service/comments/comment/requester/delete_comment.service';
import { CommentContent } from '../model/comment/comment_content';

@Resolver(() => Comment)
export class CommentResolver {
  private readonly logger: Logger = new Logger(CommentResolver.name);

  constructor(
    @Inject(CommentDITokens.CreateCommentService)
    private readonly create_comment_service: CreateCommentService,
    @Inject(CommentDITokens.QueryCommentsService)
    private readonly query_comments_service: QueryCommentsService,
    @Inject(CommentDITokens.UpdateCommentService)
    private readonly update_comment_service: UpdateCommentService,
    @Inject(CommentDITokens.DeleteCommentService)
    private readonly delete_comment_service: DeleteCommentService,
  ) {}

  @Mutation(() => Comment)
  public async createComment(
    @Args({
      name: 'comment_details',
      type: () => NewComment,
    })
    comment_details: NewComment,
    @Args({ name: 'post_id', type: () => ID }) post_id: Id,
  ) {
    this.logger.log('Creating comment in comment ms');
    const { _id, owner_id, content, created_at } =
      await this.create_comment_service.execute({
        content: {
          description: comment_details.description,
          media_locator: comment_details.media_locator,
        },
        owner_id: comment_details.owner_id,
        post_id,
      });
    this.logger.log('Comment created with success');
    return CommentMapper.toGraphQLModel({ _id, owner_id, content, created_at });
  }

  @Query(() => [Comment])
  public async queryComments(
    @Args({ name: 'post_id', type: () => ID }) post_id: Id,
    @Args({ name: 'comments_pagination', type: () => PaginationParams })
    search_params?: PaginationParams,
  ) {
    const { page, limit } = search_params;
    const { comments } = await this.query_comments_service.execute({
      post_id,
      page,
      limit,
    });
    return comments.map(CommentMapper.toGraphQLModel);
  }

  @Mutation(() => CommentContent)
  public async updateComment(
    @Args({ name: 'comment_id', type: () => ID }) comment_id: Id,
    @Args({ name: 'new_content', type: () => CommentContentUpdate })
    updates: CommentContentUpdate,
  ) {
    const { description, media_locator } = updates;
    this.logger.log('Updating comment in comment ms');
    const updated_comment = await this.update_comment_service.execute({
      id: comment_id,
      description,
      media_locator,
    });
    this.logger.log('Comment updated with success');
    return {
      description: updated_comment.description,
      media_locator: updated_comment.media_locator,
    };
  }

  @Mutation(() => String)
  public async deleteComment(
    @Args({ name: 'comment_id', type: () => ID }) comment_id: Id,
  ) {
    this.logger.log('Deleting comment in comment ms');
    const deleted = await this.delete_comment_service.execute({
      id: comment_id,
    });
    this.logger.log('Comment deleted with success');
    return deleted.deleted_comment;
  }
}
