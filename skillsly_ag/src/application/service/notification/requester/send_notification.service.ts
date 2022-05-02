import Requester from '@application/common/requester/requester';
import SendNotificationRequestInput from '@application/service/notification/request-input/send_notification.request-input';
import SendNotificationRequestResponse from '@application/service/notification/request-response/send_notification.request-response';
import { Request } from '@application/common/request/request';
import { Injectable } from '@nestjs/common';
import { NOTIFICATION_MS_URL } from '@application/service/notification/url';

@Injectable()
export class SendNotificationService
  implements
    Requester<SendNotificationRequestInput, SendNotificationRequestResponse>
{
  constructor(private readonly request: Request) {}

  public async execute(
    input: SendNotificationRequestInput,
  ): Promise<SendNotificationRequestResponse> {
    return await this.request.postRequest<SendNotificationRequestResponse>({
      url: `${NOTIFICATION_MS_URL}/notification`,
      body: { ...input },
      params: {},
    });
  }
}
