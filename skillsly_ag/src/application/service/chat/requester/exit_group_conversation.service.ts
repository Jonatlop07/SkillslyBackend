import {Injectable} from '@nestjs/common';
import Requester from '@application/common/requester/requester';
import {Request} from '@application/common/request/request';
import {CHAT_MS_URL} from '@application/service/chat/url';
import ExitGroupConversationRequestInput
  from '@application/service/chat/request-input/exit_group_conversation.request_input';

@Injectable()
export class ExitGroupConversationService implements Requester<ExitGroupConversationRequestInput, void> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: ExitGroupConversationRequestInput): Promise<void> {
    return await this.request.patchRequest<void>({
      url: `${CHAT_MS_URL}/conversation/group/exit`,
      params: {},
      body: input
    });
  }
}