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
import { PostDITokens } from '@application/service/post/di/post_di_tokens';
import { QueryPostService } from '@application/service/post/requester/query_post.service';
import { UserDITokens } from '@application/service/user/di/user_di_tokens';
import { QueryUserService } from '@application/service/user/requester/query_user.service';
import QueryUserRequestInput from '@application/service/user/request-input/query_user.request_input';

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
    @Inject(PostDITokens.QueryPostService)
    private readonly query_post_service: QueryPostService,
    @Inject(UserDITokens.QueryUserService)
    private readonly query_user_service: QueryUserService,
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
    //to do: validate if posts exists
    this.logger.log('Creating comment in comment service');
    this.logger.log('Checking if post exists in post service');
    const { query_post } = await this.query_post_service.execute({
      post_id,
    });
    this.logger.log(query_post);
    this.logger.log('Post confirmed');
    const { _id, owner_id, content, created_at } =
      await this.create_comment_service.execute({
        content: {
          description: comment_details.description,
          media_locator: comment_details.media_locator,
          media_type: comment_details.media_type,
        },
        owner_id: comment_details.owner_id,
        post_id,
      });
    this.logger.log('Comment created with success');
    this.logger.log('Querying owner data in user service');
    const input: QueryUserRequestInput = {
      id: owner_id,
    };
    const { account_details } = await this.query_user_service.execute(input);
    this.logger.log('User data queried');
    return CommentMapper.toGraphQLModel(
      { _id, owner_id, content, created_at },
      { name: account_details.name, email: account_details.email },
    );
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

    const comments_with_user = Promise.all(
      comments.map(async (comment) => {
        this.logger.log('Querying owner data in user service');
        const input: QueryUserRequestInput = {
          id: comment.owner_id,
        };
        const { account_details } = await this.query_user_service.execute(
          input,
        );
        this.logger.log('User data queried');
        return {
          ...comment,
          name: account_details.name,
          email: account_details.email,
        };
      }),
    );

    return (await comments_with_user).map((comment) => {
      return CommentMapper.toGraphQLModel(
        {
          _id: comment._id,
          post_id: comment.post_id,
          content: comment.content,
          created_at: comment.created_at,
          updated_at: comment.updated_at,
          owner_id: comment.owner_id,
          inner_comment_count: comment.inner_comment_count,
        },
        { name: comment.name, email: comment.email },
      );
    });
  }

  @Mutation(() => CommentContent)
  public async updateComment(
    @Args({ name: 'comment_id', type: () => ID }) comment_id: Id,
    @Args({ name: 'new_content', type: () => CommentContentUpdate })
    updates: CommentContentUpdate,
  ) {
    const { description, media_locator, media_type } = updates;
    this.logger.log('Updating comment in comment ms');
    const updated_comment = await this.update_comment_service.execute({
      id: comment_id,
      description,
      media_locator,
      media_type,
    });
    this.logger.log('Comment updated with success');
    return {
      description: updated_comment.description,
      media_locator: updated_comment.media_locator,
      media_type: updated_comment.media_type,
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
