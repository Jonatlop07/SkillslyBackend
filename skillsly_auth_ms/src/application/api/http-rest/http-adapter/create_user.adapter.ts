import { CreateUserDTO } from '@application/api/http-rest/http-dto/http_create_user.dto';
import CreateUserInputModel from '@core/domain/use-case/input-model/create_user.input_model';
import CreateUserOutputModel from '@core/domain/use-case/output-model/create_user.output_model';
import { CreateUserResponseDTO } from '@application/api/http-rest/http-dto/http_create_user_response.dto';

export class CreateUserAdapter {
  public static toInputModel(payload: CreateUserDTO): CreateUserInputModel {
    return {
      email: payload.email,
      password: payload.password
    };
  }

  public static toResponseDTO(payload: CreateUserOutputModel): CreateUserResponseDTO {
    return {
      id: payload.id,
      email: payload.email,
    };
  }
}
