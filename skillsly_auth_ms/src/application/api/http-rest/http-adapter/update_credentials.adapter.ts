import UpdateCredentialsInputModel from '@core/domain/use-case/input-model/update_credentials.input_model';
import { UpdateCredentialsDTO } from '@application/api/http-rest/http-dto/http_update_credentials.dto';
import UpdateCredentialsOutputModel from '@core/domain/use-case/output-model/update_credentials.output_model';
import { UpdateCredentialsResponseDTO } from '@application/api/http-rest/http-dto/http_update_credentials_response.dto';

export class UpdateCredentialsAdapter {
  public static toInputModel(id: string, payload: UpdateCredentialsDTO): UpdateCredentialsInputModel {
    return {
      id,
      email: payload.email,
      password: payload.password,
    };
  }

  public static toResponseDTO(payload: UpdateCredentialsOutputModel): UpdateCredentialsResponseDTO {
    return {
      id: payload.id,
      email: payload.email,
      is_two_factor_auth_enabled: payload.is_two_factor_auth_enabled
    };
  }
}
