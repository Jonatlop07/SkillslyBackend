import { SearchedUserDTO } from '@core/domain/use-case/search/dto/searched_user.dto'

export default interface SearchUsersOutputModel{
  users: Array<SearchedUserDTO>
}
