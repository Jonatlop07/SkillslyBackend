import { Inject, Logger } from '@nestjs/common'
import DeleteFollowUserRequestInputModel
  from '@core/domain/use-case/follow_request/input-model/delete_follow_user_request.input_model'
import DeleteFollowUserRequestGateway
  from '@core/domain/use-case/follow_request/gateway/delete_follow_user_request.gateway'
import {
  FollowUserRelationshipNotFoundException, FollowUserRequestInvalidDataFormatException,
  FollowUserRequestNotFoundException
} from '@core/domain/use-case/follow_request/exception/follow_user_request.exception'
import { DeleteFollowUserRequestInteractor } from '@core/domain/use-case/follow_request/interactor/delete_user_follow_request.interactor'
import DeleteFollowUserRequestOutputModel
  from '@core/domain/use-case/follow_request/output-model/delete_follow_user_request.output_model'
import { UserDITokens } from '@core/domain/di/user_di_tokens'
import { UserAccountNotFoundException } from '@core/domain/use-case/common/exception/user_account.exception'
import { FollowRequestDTO } from '@core/domain/use-case/follow_request/persistence/follow_request.dto'
import UserRequestDetailsDTO from '@core/domain/use-case/follow_request/dto/user_request_details.dto'

export class DeleteFollowUserRequestService implements DeleteFollowUserRequestInteractor {
  private readonly logger: Logger = new Logger(DeleteFollowUserRequestService.name);

  constructor(
    @Inject(UserDITokens.UserRepository)
    private gateway: DeleteFollowUserRequestGateway,
  ) {
  }

  public async execute(input: DeleteFollowUserRequestInputModel): Promise<DeleteFollowUserRequestOutputModel> {
    const { user_that_requests_id, user_to_follow_id, is_follow_request } = input;
    const is_valid_action = is_follow_request !== undefined && is_follow_request !== null;
    if (!is_valid_action)
      throw new FollowUserRequestInvalidDataFormatException();
    const requesting_user = await this.gateway.findOne({ id: user_that_requests_id });
    if (!requesting_user)
      throw new UserAccountNotFoundException();
    const user_to_follow = await this.gateway.findOne({ id: user_to_follow_id });
    if (!user_to_follow)
      throw new UserAccountNotFoundException();
    const follow_request: FollowRequestDTO = { user_that_requests_id, user_to_follow_id };
    const exists_follow_user_request = await this.gateway.existsFollowUserRequest(follow_request);
    if (!exists_follow_user_request && is_follow_request)
      throw new FollowUserRequestNotFoundException();
    const exists_follow_user_relationship = await this.gateway.existsFollowUserRelationship(follow_request);
    if (!exists_follow_user_relationship && !is_follow_request)
      throw new FollowUserRelationshipNotFoundException();
    await this.gateway.deleteUserRelationship(follow_request);
    return {
      user_details: requesting_user as UserRequestDetailsDTO
    }
  }
}
