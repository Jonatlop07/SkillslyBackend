import { Injectable } from '@nestjs/common'
import { Request } from '@application/common/request/request'
import Requester from '@application/common/requester/requester'
import ListServiceRequestInput from '../request-input/list_service.request_input'
import ListServiceRequestResponse from '../request-response/list_service.request_response'
import { SERVICE_MS_URL } from '../url'
import ServiceModel from '../model/service.model'

@Injectable()
export class ListServiceService implements Requester<ListServiceRequestInput, Array<ServiceModel>> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: ListServiceRequestInput): Promise<Array<ServiceModel>> {
    return await this.request.getRequest<Array<ServiceModel>>({
      url: `${SERVICE_MS_URL}/listservices/`,
      params: input
    });
  }
}
