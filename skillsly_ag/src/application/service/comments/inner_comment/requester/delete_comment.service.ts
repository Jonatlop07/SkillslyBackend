import Requester from '@application/common/requester/requester';
import { Injectable } from '@nestjs/common';
import { Request } from '@application/common/request/request';
import { COMMENT_MS_URL } from '@application/service/user/url';
import DeleteInnerCommentRequestInput from '../request-input/delete_inner_comment.request_input';
import DeleteInnerCommentRequestResponse from '../request-response/delete_inner_comment.request_response';

@Injectable()
export class DeleteInnerCommentService
implements
    Requester<
    DeleteInnerCommentRequestInput,
    DeleteInnerCommentRequestResponse
    > {
  constructor(private readonly request: Request) {}

  public async execute(
    input: DeleteInnerCommentRequestInput,
  ): Promise<DeleteInnerCommentRequestResponse> {
    return await this.request.deleteRequest<DeleteInnerCommentRequestResponse>({
      url: `${COMMENT_MS_URL}/inner-comments/${input.id}`,
      params: {},
    });
  }
}
