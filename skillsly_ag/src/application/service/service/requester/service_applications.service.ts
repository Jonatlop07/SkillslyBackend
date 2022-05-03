import { Injectable } from '@nestjs/common'
import { Request } from '@application/common/request/request'
import Requester from '@application/common/requester/requester'
import ServiceApplicationsRequestInput from '../request-input/service_applications.request_input'
import { SERVICE_MS_URL } from '../url'
import ApplicationModel from '../model/application.model'

@Injectable()
export class ServiceApplicationsService implements Requester<ServiceApplicationsRequestInput, Array<ApplicationModel>> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: ServiceApplicationsRequestInput): Promise<Array<ApplicationModel>> {
    return await this.request.getRequest<Array<ApplicationModel>>({
      url: `${SERVICE_MS_URL}/serviceapplications/`,
      params: input
    });
  }
}