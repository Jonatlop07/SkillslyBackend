import { PartialUserUpdateDTO } from '@core/domain/use-case/account/persistence/partial_user_update.dto'
import { Id } from '@core/common/type/common_types'

export default interface UpdateUserAccountInputModel {
  id: Id;
  updates: PartialUserUpdateDTO;
}
