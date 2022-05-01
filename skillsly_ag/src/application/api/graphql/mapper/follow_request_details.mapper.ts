import { FollowRequestDetails } from '@application/api/graphql/model/user/follow_request_details'
import FollowRequestDetailsModel from '@application/service/user/model/follow_request_details.model'

export class FollowRequestDetailsMapper {
  public static toGraphQLModel(request_details: FollowRequestDetailsModel): FollowRequestDetails {
    const { id, email, name, gender } = request_details;
    return { id, email, name, gender };
  }
}
