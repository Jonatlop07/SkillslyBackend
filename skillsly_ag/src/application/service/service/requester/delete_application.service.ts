import { Injectable } from '@nestjs/common';
import { Request } from '@application/common/request/request';
import Requester from '@application/common/requester/requester';
import DeleteApplicationRequestInput from '../request-input/delete_application.request_input';
import DeleteApplicationRequestResponse from '../request-response/delete_application.request_response';
import { SERVICE_MS_URL } from '@application/service/service/url';
import ApplicationModel from '../model/application.model';

@Injectable()
export class DeleteApplicationService implements Requester<DeleteApplicationRequestInput, DeleteApplicationRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: DeleteApplicationRequestInput): Promise<DeleteApplicationRequestResponse> {
    const deleted_application = await this.request.deleteRequest<ApplicationModel>({
      url: `${SERVICE_MS_URL}/application/RUD/${input.application_id}`,
      params: {}
    });
    return { deleted_application };
  }
}