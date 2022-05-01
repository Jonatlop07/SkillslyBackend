import { UserModel } from '@application/common/model/user.model';

export default interface UpdateAccountRequestResponse {
  updated_account: UserModel;
}
