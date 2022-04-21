import { UserDTO } from '@core/domain/use-case/dto/user.dto';

export default interface DeleteUserOutputModel {
  deleted_user: UserDTO;
}
