import Requester from '@application/common/requester/requester';
import GetConversationsCollectionRequestInput
  from '@application/service/chat/request-input/get_conversations_collection.request_input';
import {Injectable} from '@nestjs/common';
import GetConversationsCollectionRequestResponse
  from '@application/service/chat/request-response/get_conversations_collection.request_response';
import {Request} from '@application/common/request/request';
import {CHAT_MS_URL} from '@application/service/chat/url';


@Injectable()
export class GetConversationsCollectionService implements Requester<GetConversationsCollectionRequestInput, GetConversationsCollectionRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: GetConversationsCollectionRequestInput): Promise<GetConversationsCollectionRequestResponse> {
    return await this.request.getRequest<GetConversationsCollectionRequestResponse>({
      url: `${CHAT_MS_URL}/conversation/${input.UserID}`,
      params: {},
    });
  }
}