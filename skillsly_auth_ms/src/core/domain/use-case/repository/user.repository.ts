import CreateUserGateway from '@core/domain/use-case/gateway/create_user.gateway'
import ValidateCredentialsGateway from '@core/domain/use-case/gateway/validate_credentials.gateway';
import UpdateCredentialsGateway from '@core/domain/use-case/gateway/update_credentials.gateway';
import DeleteUserGateway from '@core/domain/use-case/gateway/delete_user.gateway';

export default interface UserRepository extends CreateUserGateway, ValidateCredentialsGateway,
  UpdateCredentialsGateway, DeleteUserGateway {}
