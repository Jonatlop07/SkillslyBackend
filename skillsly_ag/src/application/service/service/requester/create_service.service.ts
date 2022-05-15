import { Injectable } from '@nestjs/common';
import { Request } from '@application/common/request/request';
import Requester from '@application/common/requester/requester';
import CreateServiceRequestInput from '../request-input/create_service.request_input';
import CreateServiceRequestResponse from '../request-response/create_service.request_response';
import { SERVICE_MS_URL } from '@application/service/service/url';
import ServiceModel from '../model/service.model';

@Injectable()
export class CreateServiceService implements Requester<CreateServiceRequestInput, CreateServiceRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: CreateServiceRequestInput): Promise<CreateServiceRequestResponse> {
    const { requester_id, title, description, contact_info, category } = input;
    const created_service = await this.request.postRequest<ServiceModel>({
      url: `${SERVICE_MS_URL}/createservice/`,
      body: {
        requester_id,
        title,
        description,
        contact_info,
        category
      },
      params: {}
    });
    return { created_service };
  }
}