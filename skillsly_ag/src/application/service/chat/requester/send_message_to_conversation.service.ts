import {Injectable} from '@nestjs/common';
import Requester from '@application/common/requester/requester';
import {Request} from '@application/common/request/request';
import {CHAT_MS_URL} from '@application/service/chat/url';
import SendMessageToConversationRequestInput
  from '@application/service/chat/request-input/send_message_to_conversation.request_input';

@Injectable()
export class SendMessageToConversationService implements Requester<SendMessageToConversationRequestInput, void> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: SendMessageToConversationRequestInput): Promise<void> {
    await this.request.postRequest<SendMessageToConversationRequestInput>({
      url: `${CHAT_MS_URL}/messages/${input.ConversationID}`,
      params: {},
      body: input
    });
  }
}