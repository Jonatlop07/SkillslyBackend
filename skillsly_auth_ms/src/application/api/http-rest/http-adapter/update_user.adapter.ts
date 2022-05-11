import { UpdateUserDTO } from '@application/api/http-rest/http-dto/http_update_user.dto'
import { UpdateUserResponseDTO } from '../http-dto/http_update_user_response.dto';
import UpdateUserInputModel from '@core/domain/use-case/input-model/update_user.input_model'
import UpdateUserOutputModel from '@core/domain/use-case/output-model/update_user.output_model'

export class UpdateUserAdapter {
  public static toInputModel(user_id: string, payload: UpdateUserDTO): UpdateUserInputModel {
    return {
      user_id,
      ...payload
    };
  }

  public static toResponseDTO(payload: UpdateUserOutputModel): UpdateUserResponseDTO {
    return {
      user: payload.user
    };
  }
}
