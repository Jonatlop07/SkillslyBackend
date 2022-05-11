import {Id} from '@application/common/type/common_types';
import {InputMember} from '@application/api/graphql/model/chat/input/input_member';

export default interface CreateGroupConversationRequestInput {
  RequestUserID: Id,
  Name: string,
  Description: string,
  Members: Array<InputMember>,
  IsPrivate: boolean
}