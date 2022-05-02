import { UserModel } from '@application/common/model/user.model';

export default interface QueryUserRequestResponse {
  account_details: UserModel;
}
