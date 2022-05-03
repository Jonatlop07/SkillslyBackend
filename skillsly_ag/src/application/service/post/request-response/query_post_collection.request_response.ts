import PostModel from '@application/service/post/model/post.model';

export default interface QueryPostCollectionRequestResponse {
  posts: Array<PostModel>;
}