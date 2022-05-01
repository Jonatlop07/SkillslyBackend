import { Inject, Logger } from '@nestjs/common'
import {
  FollowUserRequestAlreadyExistsException,
  FollowUserRequestInvalidDataFormatException
} from '@core/domain/use-case/follow_request/exception/follow_user_request.exception'
import CreateFollowUserRequestGateway
  from '@core/domain/use-case/follow_request/gateway/create_follow_user_request.gateway'
import { CreateFollowUserRequestInteractor } from '@core/domain/use-case/follow_request/interactor/create_follow_user_request.interactor'
import { FollowRequestDTO } from '@core/domain/use-case/follow_request/persistence/follow_request.dto'
import CreateFollowUserRequestInputModel
  from '@core/domain/use-case/follow_request/input-model/create_follow_user_request.input_model'
import { UserDITokens } from '@core/domain/di/user_di_tokens'
import CreateFollowUserRequestOutputModel
  from '@core/domain/use-case/follow_request/output-model/create_follow_user_request.output_model'
import { UserAccountNotFoundException } from '@core/domain/use-case/common/exception/user_account.exception'
import UserRequestDetailsDTO from '@core/domain/use-case/follow_request/dto/user_request_details.dto'

export class CreateFollowUserRequestService implements CreateFollowUserRequestInteractor {
  private readonly logger: Logger = new Logger(CreateFollowUserRequestService.name);

  constructor(
    @Inject(UserDITokens.UserRepository)
    private gateway: CreateFollowUserRequestGateway,
  ) {
  }

  public async execute(input: CreateFollowUserRequestInputModel): Promise<CreateFollowUserRequestOutputModel> {
    const { user_that_requests_id, user_to_follow_id } = input;
    const requesting_user = await this.gateway.findOne({ id: user_that_requests_id });
    if (!requesting_user)
      throw new UserAccountNotFoundException();
    const user_to_follow = await this.gateway.findOne({ id: user_to_follow_id });
    if (!user_to_follow)
      throw new UserAccountNotFoundException();
    if (user_that_requests_id === user_to_follow_id)
      throw new FollowUserRequestInvalidDataFormatException();
    const follow_request: FollowRequestDTO = {
      user_that_requests_id,
      user_to_follow_id
    };
    const exists_user_follow_request = await this.gateway.existsFollowUserRequest(follow_request);
    if (exists_user_follow_request)
      throw new FollowUserRequestAlreadyExistsException();
    const id = await this.gateway.createFollowUserRequest(follow_request);
    return {
      user_details: {
        ...requesting_user,
        actor_id: requesting_user.id,
        id
      }
    }
  }
}
