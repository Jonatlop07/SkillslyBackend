import Requester from '@application/common/requester/requester';
import { Request } from '@application/common/request/request';
import { SERVICE_MS_URL } from '../url';
import { Injectable } from '@nestjs/common';
import UpdateApplicationRequestInput from '../request-input/update_application.request_input';
import UpdateApplicationRequestResponse from '../request-response/update_application.request_response';
import ApplicationModel from '../model/application.model';

@Injectable()
export class UpdateApplicationService implements Requester<UpdateApplicationRequestInput, UpdateApplicationRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: UpdateApplicationRequestInput): Promise<UpdateApplicationRequestResponse> {
    const { application_id, message  } = input;
    return await this.request.putRequest<UpdateApplicationRequestResponse>({
      url: `${SERVICE_MS_URL}/application/RUD/${application_id}`,
      body: {
        message
      },
      params: {}
    });
  }
}