import { Injectable } from '@nestjs/common'
import { Request } from '@application/common/request/request'
import Requester from '@application/common/requester/requester'
import DeleteServiceRequestInput from '../request-input/delete_service.request_input'
import DeleteServiceRequestResponse from '../request-response/delete_service.request_response'
import { SERVICE_MS_URL } from '@application/service/service/url'
import ServiceModel from '../model/service.model'

@Injectable()
export class DeleteServiceService implements Requester<DeleteServiceRequestInput, DeleteServiceRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: DeleteServiceRequestInput): Promise<DeleteServiceRequestResponse> {
    const deleted_service = await this.request.deleteRequest<ServiceModel>({
      url: `${SERVICE_MS_URL}/service/RUD/${input.service_id}`,
      params: {}
    });
    return { deleted_service };
  }
}