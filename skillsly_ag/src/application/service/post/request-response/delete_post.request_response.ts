import PostModel from '@application/service/post/model/post.model';

export default interface DeletePostRequestResponse {
  deleted_post: PostModel;
}