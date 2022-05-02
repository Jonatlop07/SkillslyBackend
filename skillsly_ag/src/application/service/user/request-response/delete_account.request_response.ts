import { UserModel } from '@application/common/model/user.model';

export default interface DeleteAccountRequestResponse {
  deleted_user: UserModel;
}
