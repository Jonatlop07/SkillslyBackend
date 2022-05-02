import CreatePostRequestInput from '@application/service/post/request-input/create_post.request_input';
import CreatePostRequestResponse from '@application/service/post/request-response/create_post.request_response';
import {Injectable} from '@nestjs/common';
import { Request } from '@application/common/request/request';
import Requester from '@application/common/requester/requester';
import PostModel from '@application/service/post/model/post.model';
import {POST_MS_URL} from '@application/service/post/url';

@Injectable()
export class CreatePostService implements Requester<CreatePostRequestInput, CreatePostRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: CreatePostRequestInput): Promise<CreatePostRequestResponse> {
    const { owner_id, description, privacy, content_element  } = input;
    const created_post = await this.request.postRequest<PostModel>({
      url: `${POST_MS_URL}/api/v1/posts`,
      body: {
        owner_id,
        description,
        privacy,
        content_element,
      },
      params: {}
    });
    return { created_post };
  }
}