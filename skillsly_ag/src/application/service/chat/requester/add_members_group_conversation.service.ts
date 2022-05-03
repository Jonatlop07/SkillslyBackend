import Requester from '@application/common/requester/requester';
import CreateGroupConversationRequestInput
  from '@application/service/chat/request-input/create_group_conversation.request_input';
import {Request} from '@application/common/request/request';
import {CHAT_MS_URL} from '@application/service/chat/url';
import AddMembersToGroupConversationRequestInput
  from '@application/service/chat/request-input/add_members_to_group_conversation.request_input';

export class AddMembersGroupConversationService implements Requester<AddMembersToGroupConversationRequestInput, void> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: AddMembersToGroupConversationRequestInput): Promise<void> {
    return await this.request.patchRequest<void>({
      url: `${CHAT_MS_URL}/conversation/group/add`,
      params: {},
      body: input
    });
  }
}