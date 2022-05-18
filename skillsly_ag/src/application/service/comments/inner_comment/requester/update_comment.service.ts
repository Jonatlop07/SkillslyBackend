import Requester from '@application/common/requester/requester';
import { Injectable } from '@nestjs/common';
import { Request } from '@application/common/request/request';
import { COMMENT_MS_URL } from '@application/service/user/url';
import UpdateInnerCommentRequestInput from '../request-input/update_inner_comment.request_input';
import UpdateInnerCommentRequestResponse from '../request-response/update_inner_comment.request_response';

@Injectable()
export class UpdateInnerCommentService
  implements
    Requester<
      UpdateInnerCommentRequestInput,
      UpdateInnerCommentRequestResponse
    >
{
  constructor(private readonly request: Request) {}

  public async execute(
    input: UpdateInnerCommentRequestInput,
  ): Promise<UpdateInnerCommentRequestResponse> {
    const { description, media_locator, media_type, id } = input;
    return await this.request.putRequest<UpdateInnerCommentRequestResponse>({
      url: `${COMMENT_MS_URL}/inner-comments/${id}`,
      body: { description, media_locator, media_type },
      params: {},
    });
  }
}
