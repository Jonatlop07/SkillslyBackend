import Requester from '@application/common/requester/requester';
import { Injectable } from '@nestjs/common';
import { Request } from '@application/common/request/request';
import { COMMENT_MS_URL } from '@application/service/user/url';
import DeleteInnerCommentsByOwnerRequestInput from '../request-input/delete_owner_inner_comments.request_input';
import DeleteInnerCommentsByOwnerRequestResponse from '../request-response/delete_owner_inner_comments.request_response';

@Injectable()
export class DeleteInnerCommentsByOwnerService
implements
    Requester<
    DeleteInnerCommentsByOwnerRequestInput,
    DeleteInnerCommentsByOwnerRequestResponse
    > {
  constructor(private readonly request: Request) {}

  public async execute(
    input: DeleteInnerCommentsByOwnerRequestInput,
  ): Promise<DeleteInnerCommentsByOwnerRequestResponse> {
    return await this.request.deleteRequest<DeleteInnerCommentsByOwnerRequestResponse>(
      {
        url: `${COMMENT_MS_URL}/inner-comments/user/${input.owner_id}`,
        params: {},
      },
    );
  }
}
