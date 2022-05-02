import {Injectable} from '@nestjs/common';
import Requester from '@application/common/requester/requester';
import DeletePostRequestInput from '@application/service/post/request-input/delete_post.request_input';
import DeletePostRequestResponse from '@application/service/post/request-response/delete_post.request_response';
import {Request} from '@application/common/request/request';
import {POST_MS_URL} from '@application/service/post/url';
import PostModel from '@application/service/post/model/post.model';

@Injectable()
export class DeletePostService implements Requester<DeletePostRequestInput, DeletePostRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: DeletePostRequestInput): Promise<DeletePostRequestResponse> {
    const deleted_post = await this.request.deleteRequest<PostModel>({
      url: `${POST_MS_URL}/api/v1/posts/${input.post_id}`,
      params: {}
    });
    return {deleted_post};
  }
}