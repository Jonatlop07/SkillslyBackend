import { Injectable } from '@nestjs/common';
import Requester from '@application/common/requester/requester';
import { Request } from '@application/common/request/request';
import UpdateFollowUserRequestRequestInput
  from '@application/service/user/request-input/update_follow_user_request.request_input';
import UpdateFollowUserRequestRequestResponse
  from '@application/service/user/request-response/update_follow_user_request.request_response';
import { USER_MS_URL } from '@application/service/user/url';

@Injectable()
export class UpdateFollowUserRequestService implements Requester<UpdateFollowUserRequestRequestInput, UpdateFollowUserRequestRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: UpdateFollowUserRequestRequestInput): Promise<UpdateFollowUserRequestRequestResponse> {
    const { user_id, user_that_requests_id, accept } = input;
    return await this.request.patchRequest<UpdateFollowUserRequestRequestResponse>({
      url: `${USER_MS_URL}/user/${user_id}/follow/${user_that_requests_id}`,
      body: { accept },
      params: {}
    });
  }
}
