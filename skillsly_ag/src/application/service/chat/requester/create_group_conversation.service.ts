import Requester from '@application/common/requester/requester';
import {Request} from '@application/common/request/request';
import {CHAT_MS_URL} from '@application/service/chat/url';
import CreateGroupConversationRequestInput
  from '@application/service/chat/request-input/create_group_conversation.request_input';

export class CreateGroupConversationService implements Requester<CreateGroupConversationRequestInput, void> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: CreateGroupConversationRequestInput): Promise<void> {
    return await this.request.postRequest<void>({
      url: `${CHAT_MS_URL}/conversation/group`,
      params: {},
      body: input
    });
  }
}