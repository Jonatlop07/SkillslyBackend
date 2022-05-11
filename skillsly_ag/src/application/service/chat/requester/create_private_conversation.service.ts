import Requester from '@application/common/requester/requester';
import CreatePrivateConversationRequestInput
  from '@application/service/chat/request-input/create_private_conversation.request_input';
import {Request} from '@application/common/request/request';
import {CHAT_MS_URL} from '@application/service/chat/url';
import {Injectable} from '@nestjs/common';

@Injectable()
export class CreatePrivateConversationService implements Requester<CreatePrivateConversationRequestInput, void> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: CreatePrivateConversationRequestInput): Promise<void> {
    return await this.request.postRequest<void>({
      url: `${CHAT_MS_URL}/conversation`,
      params: {},
      body: input
    });
  }
}