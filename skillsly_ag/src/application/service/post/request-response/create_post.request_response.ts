import PostModel from '@application/service/post/model/post.model';

export default interface CreatePostRequestResponse {
  created_post: PostModel;
}
