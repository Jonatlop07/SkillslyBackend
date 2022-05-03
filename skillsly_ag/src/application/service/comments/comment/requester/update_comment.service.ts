import Requester from '@application/common/requester/requester';
import { Injectable } from '@nestjs/common';
import { Request } from '@application/common/request/request';
import { COMMENT_MS_URL } from '@application/service/user/url';
import UpdateCommentRequestInput from '../request-input/update_comment.request_input';
import UpdateCommentRequestResponse from '../request-response/update_comment.request_response';

@Injectable()
export class UpdateCommentService
implements Requester<UpdateCommentRequestInput, UpdateCommentRequestResponse> {
  constructor(private readonly request: Request) {}

  public async execute(
    input: UpdateCommentRequestInput,
  ): Promise<UpdateCommentRequestResponse> {
    const { description, media_locator, id } = input;

    return await this.request.putRequest<UpdateCommentRequestResponse>({
      url: `${COMMENT_MS_URL}/comments/${id}`,
      body: { description, media_locator },
      params: {},
    });
  }
}
