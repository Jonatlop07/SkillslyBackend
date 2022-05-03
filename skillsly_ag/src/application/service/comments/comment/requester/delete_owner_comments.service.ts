import Requester from '@application/common/requester/requester';
import { Injectable } from '@nestjs/common';
import { Request } from '@application/common/request/request';
import { COMMENT_MS_URL } from '@application/service/user/url';
import DeleteCommentsByOwnerRequestInput from '../request-input/delete_owner_comments.request_input';
import DeleteCommentsByOwnerRequestResponse from '../request-response/delete_owner_comments.request_response';

@Injectable()
export class DeleteCommentsByOwnerService
implements
    Requester<
    DeleteCommentsByOwnerRequestInput,
    DeleteCommentsByOwnerRequestResponse
    > {
  constructor(private readonly request: Request) {}

  public async execute(
    input: DeleteCommentsByOwnerRequestInput,
  ): Promise<DeleteCommentsByOwnerRequestResponse> {
    return await this.request.deleteRequest<DeleteCommentsByOwnerRequestResponse>(
      {
        url: `${COMMENT_MS_URL}/comments/user/${input.owner_id}`,
        params: {},
      },
    );
  }
}
