import {Id} from '@application/common/type/common_types';

export default interface CreatePrivateConversationRequestInput {
  CreatorUserID: Id;
  MemberUserID: Id;
}