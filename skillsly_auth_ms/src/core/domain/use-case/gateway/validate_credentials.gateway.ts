import FindOne from '@core/common/persistence/find_one';
import UserQueryModel from '@core/domain/use-case/query-model/user.query_model';
import { UserDTO } from '@core/domain/use-case/dto/user.dto';

export default interface ValidateCredentialsGateway extends FindOne<UserQueryModel, UserDTO> {}
