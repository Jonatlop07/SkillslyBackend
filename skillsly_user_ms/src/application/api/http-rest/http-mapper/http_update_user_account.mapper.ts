import UpdateUserAccountResponseDTO from '@application/api/http-rest/http-dto/http_update_user_account.response_dto'
import UpdateUserAccountInputModel from '@core/domain/use-case/account/input-model/update_user_account.input_model'
import { UpdateUserAccountDTO } from '@application/api/http-rest/http-dto/http_update_user_account.dto'
import UpdateUserAccountOutputModel from '@core/domain/use-case/account/output-model/update_user_account.output_model'
import { Gender } from '@core/domain/entity/type/gender.enum'

export class UpdateUserAccountMapper {
  public static toInputModel(id: string, payload: UpdateUserAccountDTO): UpdateUserAccountInputModel {
    return {
      id,
      updates: {
        ...payload,
        gender: payload.gender as Gender
      }
    }
  }

  public static toResponseDTO(payload: UpdateUserAccountOutputModel): UpdateUserAccountResponseDTO {
    return {
      updated_account: payload.updated_account
    }
  }
}
