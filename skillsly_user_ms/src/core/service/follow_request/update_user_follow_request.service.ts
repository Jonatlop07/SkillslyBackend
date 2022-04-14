import { Inject, Logger } from '@nestjs/common'
import UpdateFollowUserRequestGateway
  from '@core/domain/use-case/follow_request/gateway/update_follow_user_request.gateway'
import UpdateFollowUserRequestInputModel
  from '@core/domain/use-case/follow_request/input-model/update_follow_user_request.input_model'
import UpdateFollowUserRequestOutputModel
  from '@core/domain/use-case/follow_request/output-model/update_follow_user_request.output_model'
import { UpdateFollowUserRequestInteractor } from '@core/domain/use-case/follow_request/interactor/update_follow_user_request.interactor'
import {
  FollowUserRequestInvalidDataFormatException,
  FollowUserRequestNotFoundException
} from '@core/domain/use-case/follow_request/exception/follow_user_request.exception'
import { FollowRequestDTO } from '@core/domain/use-case/follow_request/persistence/follow_request.dto'
import { UserDITokens } from '@core/domain/di/user_di_tokens'
import { UserAccountNotFoundException } from '@core/domain/use-case/common/exception/user_account.exception'
import UserRequestDetailsDTO from '@core/domain/use-case/follow_request/dto/user_request_details.dto'

export class UpdateFollowUserRequestService implements UpdateFollowUserRequestInteractor {
  private readonly logger: Logger = new Logger(UpdateFollowUserRequestService.name);

  constructor(
    @Inject(UserDITokens.UserRepository)
    private user_gateway: UpdateFollowUserRequestGateway
  ) {
  }

  public async execute(input: UpdateFollowUserRequestInputModel): Promise<UpdateFollowUserRequestOutputModel> {
    const { user_to_follow_id, user_that_requests_id, accept } = input;
    const is_valid_action = accept !== undefined && accept !== null;
    if (!is_valid_action)
      throw new FollowUserRequestInvalidDataFormatException();
    const requesting_user = await this.user_gateway.findOne({ id: user_that_requests_id });
    if (!requesting_user)
      throw new UserAccountNotFoundException();
    const user_to_follow = await this.user_gateway.findOne({ id: user_to_follow_id });
    if (!user_to_follow)
      throw new UserAccountNotFoundException();
    const follow_request: FollowRequestDTO = {
      user_that_requests_id,
      user_to_follow_id
    };
    const exists_user_follow_request = await this.user_gateway.existsFollowUserRequest(follow_request);
    if (!exists_user_follow_request)
      throw new FollowUserRequestNotFoundException();
    if (accept) await this.user_gateway.acceptFollowUserRequest(follow_request);
    else await this.user_gateway.rejectFollowUserRequest(follow_request);
    return {
      user_details: user_to_follow as UserRequestDetailsDTO
    }
  }
}
