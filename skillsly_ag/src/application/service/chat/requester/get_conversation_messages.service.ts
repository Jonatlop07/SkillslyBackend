import {Injectable} from '@nestjs/common';
import Requester from '@application/common/requester/requester';
import {Request} from '@application/common/request/request';
import {CHAT_MS_URL} from '@application/service/chat/url';
import GetConversationMessagesRequestInput
  from '@application/service/chat/request-input/get_conversation_messages.request_input';
import GetConversationMessagesRequestResponse
  from '@application/service/chat/request-response/get_conversation_messages.request_response';

@Injectable()
export class GetConversationMessagesService implements Requester<GetConversationMessagesRequestInput, GetConversationMessagesRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: GetConversationMessagesRequestInput): Promise<GetConversationMessagesRequestResponse> {
    return await this.request.getRequest<GetConversationMessagesRequestResponse>({
      url: `${CHAT_MS_URL}/messages/${input.ConversationID}`,
      params: {},
    });
  }
}