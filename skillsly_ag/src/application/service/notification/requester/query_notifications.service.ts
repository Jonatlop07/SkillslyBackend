import Requester from '@application/common/requester/requester';
import { Request } from '@application/common/request/request';
import { Injectable } from '@nestjs/common';
import { NOTIFICATION_MS_URL } from '@application/service/notification/url';
import QueryNotificationsRequestInput from '../request-input/query_notifications.request_input';
import QueryNotificationsRequestResponse from '../request-response/query_notifications.request_response';

@Injectable()
export class QueryNotificationsService
implements
    Requester<
    QueryNotificationsRequestInput,
    QueryNotificationsRequestResponse
    > {
  constructor(private readonly request: Request) {}

  public async execute(
    input: QueryNotificationsRequestInput,
  ): Promise<QueryNotificationsRequestResponse> {
    const { limit, offset, notifier_id } = input;
    return await this.request.getRequest<QueryNotificationsRequestResponse>({
      url: `${NOTIFICATION_MS_URL}/notification/${notifier_id}`,
      params: { limit, offset },
    });
  }
}
