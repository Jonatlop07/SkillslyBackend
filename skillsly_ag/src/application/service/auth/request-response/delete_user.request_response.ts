import { UserModel } from '@application/common/model/user.model'

export default interface DeleteUserRequestResponse {
  deleted_user: UserModel;
}
