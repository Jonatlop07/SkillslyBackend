import { UserModel } from '@application/common/model/user.model';

export default interface SearchUsersRequestResponse {
  users: Array<UserModel>;
}
