import { Id } from '@core/common/type/common_types';
import { PaginationDTO } from '@core/common/persistence/pagination.dto';

export default interface NotificationQueryParams {
  notifier_id: Id;
  pagination: PaginationDTO;
}
