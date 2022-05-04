import Requester from '@application/common/requester/requester';
import { Request } from '@application/common/request/request';
import { SERVICE_MS_URL } from '../url';
import { Injectable } from '@nestjs/common';
import UpdatePhaseServiceRequestInput from '../request-input/update_phase_service.request_input';
import UpdatePhaseServiceRequestResponse from '../request-response/update_phase_service.request_response';

@Injectable()
export class UpdatedPhaseServiceService implements Requester<UpdatePhaseServiceRequestInput, UpdatePhaseServiceRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: UpdatePhaseServiceRequestInput): Promise<UpdatePhaseServiceRequestResponse> {
    const { service_id, phase  } = input;
    return await this.request.putRequest<UpdatePhaseServiceRequestResponse>({
      url: `${SERVICE_MS_URL}/serviceupdatephase/${service_id}`,
      body: {
        phase
      },
      params: {}
    });
  }
}