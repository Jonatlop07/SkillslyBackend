import AuthUserModel from '@application/service/auth/model/auth_user.model';

export default interface DeleteUserRequestResponse {
  deleted_user: AuthUserModel;
}
