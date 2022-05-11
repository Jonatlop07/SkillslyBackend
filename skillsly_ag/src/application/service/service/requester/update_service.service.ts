import Requester from '@application/common/requester/requester';
import { Request } from '@application/common/request/request';
import { SERVICE_MS_URL } from '../url';
import { Injectable } from '@nestjs/common';
import UpdateServiceRequestInput from '../request-input/update_service.request_input';
import UpdateServiceRequestResponse from '../request-response/update_service.request_response';

@Injectable()
export class UpdateServiceService implements Requester<UpdateServiceRequestInput, UpdateServiceRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: UpdateServiceRequestInput): Promise<UpdateServiceRequestResponse> {
    const { service_id, title, description, contact_info, category } = input;
    return await this.request.putRequest<UpdateServiceRequestResponse>({
      url: `${SERVICE_MS_URL}/service/RUD/${service_id}`,
      body: {
        title,
        description,
        contact_info,
        category
      },
      params: {}
    });
  }
}