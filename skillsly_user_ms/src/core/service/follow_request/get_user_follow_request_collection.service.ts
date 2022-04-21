import GetFollowUserRequestCollectionInputModel
  from '@core/domain/use-case/follow_request/input-model/get_follow_user_request_collection.input_model'
import { GetFollowUserRequestCollectionInteractor } from '@core/domain/use-case/follow_request/interactor/get_follow_user_request_collection.interactor'
import { Inject, Logger } from '@nestjs/common'
import GetFollowUserRequestCollectionGateway
  from '@core/domain/use-case/follow_request/gateway/get_follow_user_request.gateway'
import GetFollowUserRequestCollectionOutputModel
  from '@core/domain/use-case/follow_request/output-model/get_follow_user_request_collection.output_model'
import { UserDITokens } from '@core/domain/di/user_di_tokens'
import { UserAccountNotFoundException } from '@core/domain/use-case/common/exception/user_account.exception'
import FollowRequestCollectionDTO from '@core/domain/use-case/follow_request/dto/follow_request_collection.dto'

export class GetFollowUserRequestCollectionService implements GetFollowUserRequestCollectionInteractor {
  private readonly logger: Logger = new Logger(GetFollowUserRequestCollectionService.name);

  constructor(
    @Inject(UserDITokens.UserRepository)
    private gateway: GetFollowUserRequestCollectionGateway,
  ) { }

  public async execute(input: GetFollowUserRequestCollectionInputModel): Promise<GetFollowUserRequestCollectionOutputModel> {
    const { id } = input;
    const exists_user = await this.gateway.exists({ id });
    if (!exists_user)
      throw new UserAccountNotFoundException();
    const follow_request_collection: FollowRequestCollectionDTO = await this.gateway.getFollowUserRequestCollection(id);
    return {
      follow_request_collection
    };
  }
}
