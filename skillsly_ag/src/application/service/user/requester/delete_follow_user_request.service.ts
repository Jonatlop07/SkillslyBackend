import { Injectable } from '@nestjs/common'
import Requester from '@application/common/requester/requester'
import { Request } from '@application/common/request/request'
import DeleteFollowUserRequestRequestInput
  from '@application/service/user/request-input/delete_follow_user_request.request_input'
import DeleteFollowUserRequestRequestResponse
  from '@application/service/user/request-response/delete_follow_user_request.request_response'
import { USER_MS_URL } from '@application/service/user/url'

@Injectable()
export class DeleteFollowUserRequestService implements Requester<DeleteFollowUserRequestRequestInput, DeleteFollowUserRequestRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: DeleteFollowUserRequestRequestInput): Promise<DeleteFollowUserRequestRequestResponse> {
    const { user_id, user_to_follow_id, is_follow_request } = input;
    return await this.request.deleteRequest<DeleteFollowUserRequestRequestResponse>({
      url: `${USER_MS_URL}/user/${user_id}/follow/${user_to_follow_id}`,
      params: {
        is_follow_request
      }
    })
  }
}
