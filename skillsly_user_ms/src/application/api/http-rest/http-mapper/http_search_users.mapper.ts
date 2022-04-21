import SearchUsersInputModel from '@core/domain/use-case/search/input-model/search_users.input_model'
import { PaginationDTO } from '@core/common/persistence/pagination.dto'

export class SearchUsersMapper {
  public static toInputModel(email: string, name: string, pagination: PaginationDTO): SearchUsersInputModel {
    return {
      email,
      name,
      pagination
    }
  }
}
