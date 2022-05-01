import { Injectable } from '@nestjs/common'
import Requester from '@application/common/requester/requester'
import { Request } from '@application/common/request/request'
import CreateFollowUserRequestRequestInput
  from '@application/service/user/request-input/create_follow_user_request.request_input'
import CreateFollowUserRequestRequestResponse
  from '@application/service/user/request-response/create_follow_user_request.request_response'
import { USER_MS_URL } from '@application/service/user/url'

@Injectable()
export class CreateFollowUserRequestService implements Requester<CreateFollowUserRequestRequestInput, CreateFollowUserRequestRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: CreateFollowUserRequestRequestInput): Promise<CreateFollowUserRequestRequestResponse> {
    const { user_id, user_to_follow_id } = input;
    return await this.request.postRequest<CreateFollowUserRequestRequestResponse>({
      url: `${USER_MS_URL}/user/${user_id}/follow/${user_to_follow_id}`,
      body: {},
      params: {}
    });
  }
}
