import Requester from '@application/common/requester/requester';
import { Request } from '@application/common/request/request';
import { SERVICE_MS_URL } from '../url';
import { Injectable } from '@nestjs/common';
import UpdateStatusServiceRequestInput from '../request-input/update_status_service.request_input';
import UpdateStatusServiceRequestResponse from '../request-response/update_status_service.request_response';

@Injectable()
export class UpdateStatusServiceService implements Requester<UpdateStatusServiceRequestInput, UpdateStatusServiceRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: UpdateStatusServiceRequestInput): Promise<UpdateStatusServiceRequestResponse> {
    const { service_id, canceled } = input;
    return await this.request.putRequest<UpdateStatusServiceRequestResponse>({
      url: `${SERVICE_MS_URL}/serviceupdatestatus/${service_id}`,
      body: {
        canceled
      },
      params: {}
    });
  }
}