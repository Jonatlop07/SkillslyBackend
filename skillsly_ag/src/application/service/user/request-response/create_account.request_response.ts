import { UserModel } from '@application/common/model/user.model'

export default interface CreateAccountRequestResponse {
  created_account: UserModel;
}
