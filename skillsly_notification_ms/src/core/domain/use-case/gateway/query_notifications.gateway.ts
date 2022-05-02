import FindAll from '@core/common/persistence/find_all';
import NotificationQueryParams from '../dto/query_params';
import QueriedNotificationDTO from '../dto/queried_notification.dto';

export default interface QueryNotificationsGateway
  extends FindAll<NotificationQueryParams, QueriedNotificationDTO> {}
