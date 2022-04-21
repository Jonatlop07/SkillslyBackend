import { PaginationDTO } from '@core/common/persistence/pagination.dto'

export default interface SearchUsersInputModel {
  email: string;
  name: string;
  pagination: PaginationDTO;
}
