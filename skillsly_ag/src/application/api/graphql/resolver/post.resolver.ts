import {Args, ID, Mutation, Query, Resolver} from '@nestjs/graphql';
import {Post} from '@application/api/graphql/model/post/post';
import {Inject, Logger} from '@nestjs/common';
import {PostDITokens} from '@application/service/post/di/post_di_tokens';
import {CreatePostService} from '@application/service/post/requester/create_post.service';
import {DeletePostService} from '@application/service/post/requester/delete_post.service';
import {QueryPostService} from '@application/service/post/requester/query_post.service';
import {QueryPostCollectionService} from '@application/service/post/requester/query_post_collection.service';
import {Id} from '@application/common/type/common_types';
import {PostMapper} from '@application/api/graphql/mapper/post.mapper';
import {PostCollectionMapper} from '@application/api/graphql/mapper/post_collection.mapper';
import {UpdatePostInputData} from '@application/api/graphql/model/post/input/update_post_data';
import {UpdatePostService} from '@application/service/post/requester/update_post.service';
import {NewPostInputData} from '@application/api/graphql/model/post/input/new_post_data';
import {UserDITokens} from '@application/service/user/di/user_di_tokens';
import {QueryUserService} from '@application/service/user/requester/query_user.service';
import QueryUserRequestInput from '@application/service/user/request-input/query_user.request_input';
import {User} from '@application/api/graphql/model/user/user';
import {PostCollection} from "@application/api/graphql/model/post/post_collection";

@Resolver(()=> Post)
export class PostResolver{
  private readonly logger: Logger = new Logger(PostResolver.name);
    
  constructor(
    @Inject(PostDITokens.CreatePostService)
    private readonly create_post_service: CreatePostService,
    @Inject(PostDITokens.DeletePostService)
    private readonly delete_post_service: DeletePostService,
    @Inject(PostDITokens.UpdatedPostService)
    private readonly update_post_service: UpdatePostService,
    @Inject(PostDITokens.QueryPostService)
    private readonly  query_post_service: QueryPostService,
    @Inject(PostDITokens.QueryPostCollectionService)
    private readonly query_post_collection_service: QueryPostCollectionService,
    @Inject(UserDITokens.QueryUserService)
    private readonly query_user_service: QueryUserService,
  ) {
  }
    
  @Query(() => Post)
  public async postById(
  @Args({name: 'post_id', type: () => ID}) post_id: Id
  ) {
    this.logger.log('Querying a post in post service...');
    const { query_post } = await this.query_post_service.execute({
      post_id
    });
    this.logger.log('Post queried successfully in post service');
    return PostMapper.toGraphQLModel(query_post);
  }

  @Query(() => PostCollection)
  public async postsByOwnerId (
  @Args({ name: 'owner_id' }) owner_id: Id
  ) {
    this.logger.log('Querying a collection of posts in post collection service...');
    const {posts} = await this.query_post_collection_service.execute({
      owner_id
    });
    this.logger.log('Post collection queried successfully in post collection service');
    this.logger.log('Querying User name by id');
    const input: QueryUserRequestInput = {
      id: owner_id,
    };
    const {account_details} = await this.query_user_service.execute(input);
    this.logger.log('Queried successfully in user service');
    return PostCollectionMapper.toGraphQLModel(account_details, posts);
  }
  
  @Mutation( () => Post )
  public async deletePost(
  @Args({ name: 'post_id' }) post_id: Id
  ){
    this.logger.log('Deleting a post in post service...');
    const { deleted_post } = await this.delete_post_service.execute({ post_id });
    this.logger.log('Post successfully deleted in post service');
    return PostMapper.toGraphQLModel(deleted_post);
  }

  @Mutation( () => Post )
  public async updatePost(
  @Args( {name: 'post_data', type: () => UpdatePostInputData}) post_data: UpdatePostInputData
  ){
    const { post_id, owner_id, description, privacy, content_element } = post_data;
    this.logger.log('Updating a post in post service...');
    const { updated_post } = await this.update_post_service.execute({
      post_id,
      owner_id,
      description,
      privacy,
      content_element
    });
    console.log(post_data);
    this.logger.log('Post successfully updated in post service');
    return PostMapper.toGraphQLModel(updated_post);
  }

  @Mutation( () => Post )
  public async createPost(
  @Args( {name: 'post_data', type: () => NewPostInputData}) post_data: NewPostInputData
  ){
    const { owner_id, description, privacy, content_element } = post_data;
    this.logger.log('Creating a post in post service...');
    const { created_post } = await this.create_post_service.execute({
      owner_id,
      description,
      privacy,
      content_element
    });
    this.logger.log('Post successfully created in post service');
    return PostMapper.toGraphQLModel(created_post);
  }
}