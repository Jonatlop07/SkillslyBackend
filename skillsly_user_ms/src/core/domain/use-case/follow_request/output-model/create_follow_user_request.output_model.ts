import UserRequestDetailsDTO from '@core/domain/use-case/follow_request/dto/user_request_details.dto'

export default interface CreateFollowUserRequestOutputModel {
  user_details: UserRequestDetailsDTO;
}
