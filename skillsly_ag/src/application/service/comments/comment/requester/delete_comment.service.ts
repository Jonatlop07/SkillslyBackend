import Requester from '@application/common/requester/requester';
import { Injectable } from '@nestjs/common';
import { Request } from '@application/common/request/request';
import { COMMENT_MS_URL } from '@application/service/user/url';
import DeleteCommentRequestInput from '../request-input/delete_comment.request_input';
import DeleteCommentRequestResponse from '../request-response/delete_comment.request_response';

@Injectable()
export class DeleteCommentService
  implements Requester<DeleteCommentRequestInput, DeleteCommentRequestResponse>
{
  constructor(private readonly request: Request) {}

  public async execute(
    input: DeleteCommentRequestInput,
  ): Promise<DeleteCommentRequestResponse> {
    return await this.request.deleteRequest<DeleteCommentRequestResponse>({
      url: `${COMMENT_MS_URL}/comments/${input.id}`,
      params: {},
    });
  }
}
