import CreateUserGateway from '@core/domain/use-case/gateway/create_user.gateway'
import ValidateCredentialsGateway from '@core/domain/use-case/gateway/validate_credentials.gateway';
import UpdateCredentialsGateway from '@core/domain/use-case/gateway/update_credentials.gateway';
import DeleteUserGateway from '@core/domain/use-case/gateway/delete_user.gateway';
import UpdateUserGateway from '@core/domain/use-case/gateway/update_user.gateway'
import RequestResetPasswordGateway from '@core/domain/use-case/gateway/request_reset_password.gateway'
import ResetPasswordGateway from '@core/domain/use-case/gateway/reset_password.gateway'

export default interface UserRepository extends CreateUserGateway, ValidateCredentialsGateway,
  UpdateCredentialsGateway, UpdateUserGateway, DeleteUserGateway, RequestResetPasswordGateway,
  ResetPasswordGateway {}
