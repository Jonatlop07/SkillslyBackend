import CreateUserAccountInputModel from '@core/domain/use-case/account/input-model/create_user_account.input_model'
import { CreateUserAccountDTO } from '@application/api/http-rest/http-dto/http_create_user_account.dto'
import { Gender } from '@core/domain/entity/type/gender.enum'
import CreateUserAccountOutputModel from '@core/domain/use-case/account/output-model/create_user_account.output_model'
import CreateUserAccountResponseDTO from '@application/api/http-rest/http-dto/http_create_user_account.response_dto'

export class CreateUserAccountMapper {
  public static toInputModel(payload: CreateUserAccountDTO): CreateUserAccountInputModel {
    return {
      email: payload.email,
      name: payload.name,
      date_of_birth: payload.date_of_birth,
      gender: payload.gender as Gender
    }
  }

  public static toResponseDTO(payload: CreateUserAccountOutputModel): CreateUserAccountResponseDTO {
    return {
      created_account: payload.created_account
    }
  }
}
