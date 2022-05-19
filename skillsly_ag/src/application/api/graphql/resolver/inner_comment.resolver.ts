import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, Logger } from '@nestjs/common';
import { Id } from '@application/common/type/common_types';
import { PaginationParams } from '../model/comment/input/pagination_params';
import { CommentContentUpdate } from '../model/comment/input/comment_content_update';
import { InnerCommentDITokens } from '@application/service/comments/inner_comment/di/inner_comment_di_tokens';
import { CreateInnerCommentService } from '@application/service/comments/inner_comment/requester/create_comment.service';
import { DeleteInnerCommentService } from '@application/service/comments/inner_comment/requester/delete_comment.service';
import { QueryInnerCommentsService } from '@application/service/comments/inner_comment/requester/query_comments.service';
import { UpdateInnerCommentService } from '@application/service/comments/inner_comment/requester/update_comment.service';
import { InnerCommentMapper } from '../mapper/comment/inner_comment.mapper';
import { InnerComment } from '../model/comment/inner_comment';
import { NewInnerComment } from '../model/comment/input/new_inner_comment';
import { CommentContent } from '../model/comment/comment_content';
import { UserDITokens } from '@application/service/user/di/user_di_tokens';
import { QueryUserService } from '@application/service/user/requester/query_user.service';
import QueryUserRequestInput from '@application/service/user/request-input/query_user.request_input';

@Resolver(() => InnerComment)
export class InnerCommentResolver {
  private readonly logger: Logger = new Logger(InnerCommentResolver.name);

  constructor(
    @Inject(InnerCommentDITokens.CreateInnerCommentService)
    private readonly create_inner_comment_service: CreateInnerCommentService,
    @Inject(InnerCommentDITokens.QueryInnerCommentsService)
    private readonly query_inner_comments_service: QueryInnerCommentsService,
    @Inject(InnerCommentDITokens.UpdateInnerCommentService)
    private readonly update_inner_comment_service: UpdateInnerCommentService,
    @Inject(InnerCommentDITokens.DeleteInnerCommentService)
    private readonly delete_inner_comment_service: DeleteInnerCommentService,
    @Inject(UserDITokens.QueryUserService)
    private readonly query_user_service: QueryUserService,
  ) {}

  @Mutation(() => InnerComment)
  public async createInnerComment(
    @Args({
      name: 'inner_comment_details',
      type: () => NewInnerComment,
    })
    comment_details: NewInnerComment,
    @Args({ name: 'comment_id', type: () => ID }) comment_id: Id,
  ) {
    this.logger.log('Creating inner comment in comment ms');
    const { _id, owner_id, content, created_at } =
      await this.create_inner_comment_service.execute({
        content: {
          description: comment_details.description,
          media_locator: comment_details.media_locator,
          media_type: comment_details.media_type,
        },
        owner_id: comment_details.owner_id,
        comment_id,
      });
    this.logger.log('Querying owner data in user service');
    const { account_details } = await this.query_user_service.execute({
      id: owner_id,
    });

    this.logger.log('User data queried');
    this.logger.log('Inner comment created with success');
    return InnerCommentMapper.toGraphQLModel(
      {
        _id,
        owner_id,
        content,
        created_at,
      },
      { name: account_details.name, email: account_details.email },
    );
  }

  @Query(() => [InnerComment])
  public async queryInnerComments(
    @Args({ name: 'inner_comments_pagination', type: () => PaginationParams })
    search_params: PaginationParams,
    @Args({ name: 'comment_id', type: () => ID }) comment_id: Id,
  ) {
    const { page, limit } = search_params;
    const { inner_comments } = await this.query_inner_comments_service.execute({
      comment_id,
      page,
      limit,
    });

    const comments_with_user = Promise.all(
      inner_comments.map(async (inner_comment) => {
        this.logger.log('Querying owner data in user service');
        const { account_details } = await this.query_user_service.execute({
          id: inner_comment.owner_id,
        });
        this.logger.log('User data queried');
        return {
          ...inner_comment,
          name: account_details.name,
          email: account_details.email,
        };
      }),
    );

    return (await comments_with_user).map((inner) => {
      return InnerCommentMapper.toGraphQLModel(
        {
          _id: inner._id,
          comment_id: inner.comment_id,
          content: inner.content,
          created_at: inner.created_at,
          updated_at: inner.updated_at,
          owner_id: inner.owner_id,
        },
        { name: inner.name, email: inner.email },
      );
    });
  }

  @Mutation(() => CommentContent)
  public async updateInnerComment(
    @Args({ name: 'inner_comment_id', type: () => ID }) comment_id: Id,
    @Args({ name: 'new_content', type: () => CommentContentUpdate })
    updates: CommentContentUpdate,
  ) {
    const { description, media_locator, media_type } = updates;
    this.logger.log('Updating inner comment in comment ms');
    const updated = await this.update_inner_comment_service.execute({
      id: comment_id,
      description,
      media_locator,
      media_type,
    });
    this.logger.log('Inner comment updated with success');
    return {
      description: updated.description,
      media_locator: updated.media_locator,
      media_type: updated.media_type,
    };
  }

  @Mutation(() => String)
  public async deleteInnerComment(
    @Args({ name: 'inner_comment_id', type: () => ID }) inner_comment_id: Id,
  ) {
    this.logger.log('Deleting inner comment in comment ms');
    const deleted = await this.delete_inner_comment_service.execute({
      id: inner_comment_id,
    });
    this.logger.log('Inner comment deleted with success');
    return deleted.deleted_comment;
  }
}
