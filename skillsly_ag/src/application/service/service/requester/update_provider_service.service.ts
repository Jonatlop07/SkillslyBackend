import Requester from '@application/common/requester/requester';
import { Request } from '@application/common/request/request';
import { SERVICE_MS_URL } from '../url';
import { Injectable } from '@nestjs/common';
import UpdateProviderServiceRequestInput from '../request-input/update_provider_service.request_input';
import UpdateProviderServiceRequestResponse from '../request-response/update_provider_service.request_response';

@Injectable()
export class UpdateProviderServiceService implements Requester<UpdateProviderServiceRequestInput, UpdateProviderServiceRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: UpdateProviderServiceRequestInput): Promise<UpdateProviderServiceRequestResponse> {
    const { service_id, provider_id } = input;
    return await this.request.putRequest<UpdateProviderServiceRequestResponse>({
      url: `${SERVICE_MS_URL}/serviceupdateprovider/${service_id}`,
      body: {
        provider_id
      },
      params: {}
    });
  }
}