import Requester from '@application/common/requester/requester';
import { Injectable } from '@nestjs/common';
import { Request } from '@application/common/request/request';
import { COMMENT_MS_URL } from '@application/service/user/url';
import CreateCommentRequestInput from '../request-input/create_comment.request_input';
import CreateCommentRequestResponse from '../request-response/create_comment.request_response';

@Injectable()
export class CreateCommentService
implements Requester<CreateCommentRequestInput, CreateCommentRequestResponse> {
  constructor(private readonly request: Request) {}

  public async execute(
    input: CreateCommentRequestInput,
  ): Promise<CreateCommentRequestResponse> {
    const { owner_id, post_id, content } = input;
    return await this.request.postRequest<CreateCommentRequestResponse>({
      url: `${COMMENT_MS_URL}/comments/${post_id}`,
      body: { owner_id, content },
      params: {},
    });
  }
}
