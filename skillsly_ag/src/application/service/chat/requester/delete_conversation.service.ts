import {Injectable} from '@nestjs/common';
import Requester from '@application/common/requester/requester';
import {Request} from '@application/common/request/request';
import {CHAT_MS_URL} from '@application/service/chat/url';
import DeleteConversationRequestInput from '@application/service/chat/request-input/delete_conversation.request_input';

@Injectable()
export class DeleteConversationService implements Requester<DeleteConversationRequestInput, void> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: DeleteConversationRequestInput): Promise<void> {
    return await this.request.deleteRequest<void>({
      url: `${CHAT_MS_URL}/conversation`,
      params: {},
      body: input
    });
  }
}