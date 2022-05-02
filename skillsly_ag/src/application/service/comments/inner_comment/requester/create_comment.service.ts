import Requester from '@application/common/requester/requester';
import { Injectable } from '@nestjs/common';
import { Request } from '@application/common/request/request';
import { COMMENT_MS_URL } from '@application/service/user/url';
import CreateInnerCommentRequestInput from '../request-input/create_inner_comment.request_input';
import CreateInnerCommentRequestResponse from '../request-response/create_inner_comment.request_response';

@Injectable()
export class CreateInnerCommentService
implements
    Requester<
    CreateInnerCommentRequestInput,
    CreateInnerCommentRequestResponse
    > {
  constructor(private readonly request: Request) {}

  public async execute(
    input: CreateInnerCommentRequestInput,
  ): Promise<CreateInnerCommentRequestResponse> {
    const { comment_id, content, owner_id } = input;
    return await this.request.postRequest<CreateInnerCommentRequestResponse>({
      url: `${COMMENT_MS_URL}/inner-comments/${comment_id}`,
      body: { content, owner_id },
      params: {},
    });
  }
}
