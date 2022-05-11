import {Injectable} from '@nestjs/common';
import Requester from '@application/common/requester/requester';
import {Request} from '@application/common/request/request';
import {CHAT_MS_URL} from '@application/service/chat/url';
import UpdateGroupConversationDetailsRequestInput
  from '@application/service/chat/request-input/update_group_conversation_details.request_input';

@Injectable()
export class UpdateGroupConversationDetailsService implements Requester<UpdateGroupConversationDetailsRequestInput, void> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: UpdateGroupConversationDetailsRequestInput): Promise<void> {
    await this.request.patchRequest<UpdateGroupConversationDetailsRequestInput>({
      url: `${CHAT_MS_URL}/conversation/group`,
      params: {},
      body: input
    });
  }
}