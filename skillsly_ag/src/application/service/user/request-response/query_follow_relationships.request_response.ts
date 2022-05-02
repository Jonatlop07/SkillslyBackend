import FollowRelationshipsModel from '@application/service/user/model/follow_relationships.model';

export default interface QueryFollowRelationshipsRequestResponse {
  follow_request_collection: FollowRelationshipsModel;
}
