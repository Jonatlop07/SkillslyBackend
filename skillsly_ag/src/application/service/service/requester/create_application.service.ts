import { Injectable } from '@nestjs/common';
import { Request } from '@application/common/request/request';
import Requester from '@application/common/requester/requester';
import CreateApplicationRequestInput from '../request-input/create_application.request_input';
import CreateApplicationRequestResponse from '../request-response/create_application.request_response';
import { SERVICE_MS_URL } from '@application/service/service/url';
import ApplicationModel from '../model/application.model';

@Injectable()
export class CreateApplicationService implements Requester<CreateApplicationRequestInput, CreateApplicationRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: CreateApplicationRequestInput): Promise<CreateApplicationRequestResponse> {
    const { idService, applicant_id, message } = input;
    const created_application = await this.request.postRequest<ApplicationModel>({
      url: `${SERVICE_MS_URL}/createapplication/`,
      body: {
        idService,
        applicant_id,
        message
      },
      params: {}
    });
    return { created_application };
  }
}