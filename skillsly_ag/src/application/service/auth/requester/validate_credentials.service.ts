import Requester from '@application/common/requester/requester';
import ValidateCredentialsRequestInput from '@application/service/auth/request-input/validate_credentials.request_input';
import ValidateCredentialsRequestResponse
  from '@application/service/auth/request-response/validate_credentials.request_response';
import { Injectable } from '@nestjs/common';
import { Request } from '@application/common/request/request';
import { AUTH_MS_URL } from '@application/service/auth/url';

@Injectable()
export class ValidateCredentialsService implements Requester<ValidateCredentialsRequestInput, ValidateCredentialsRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: ValidateCredentialsRequestInput): Promise<ValidateCredentialsRequestResponse> {
    return await this.request.getRequest({
      url: `${AUTH_MS_URL}/auth/validate-credentials`,
      params: {
        ...input
      }
    });
  }
}
