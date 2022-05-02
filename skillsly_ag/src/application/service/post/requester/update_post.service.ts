import {Injectable} from '@nestjs/common';
import Requester from '@application/common/requester/requester';
import UpdatePostRequestInput from '@application/service/post/request-input/update_post.request_input';
import UpdatePostRequestResponse from '@application/service/post/request-response/update_post.request_response';
import {Request} from '@application/common/request/request';
import {POST_MS_URL} from '@application/service/post/url';
import PostModel from '@application/service/post/model/post.model';

@Injectable()
export class UpdatePostService implements Requester<UpdatePostRequestInput, UpdatePostRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: UpdatePostRequestInput): Promise<UpdatePostRequestResponse> {
    const { post_id, owner_id, description, privacy, content_element  } = input;
    const updated_post =await this.request.putRequest<PostModel>({
      url: `${POST_MS_URL}/api/v1/post`,
      body: {
        post_id,
        owner_id,
        description,
        privacy,
        content_element,
      },
      params: {}
    });
    return {updated_post};
  }
}