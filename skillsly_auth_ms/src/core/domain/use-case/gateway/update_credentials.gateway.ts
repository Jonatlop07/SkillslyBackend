import { UserDTO } from '@core/domain/use-case/dto/user.dto';
import FindOne from '@core/common/persistence/find_one';
import UserQueryModel from '@core/domain/use-case/query-model/user.query_model';
import { PartialUpdateByParams } from '@core/common/persistence/partial_update_by_params';
import { PartialUserUpdateDTO } from '@core/domain/use-case/persistence/partial_user_update';

export default interface UpdateCredentialsGateway extends FindOne<UserQueryModel, UserDTO>, PartialUpdateByParams<UserDTO, PartialUserUpdateDTO, UserQueryModel> {}
