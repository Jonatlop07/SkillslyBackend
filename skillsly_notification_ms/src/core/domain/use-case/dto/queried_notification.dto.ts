import { NotificationResourceType } from '@core/domain/entity/notification_resource_type.enum';
import { Id } from '@core/common/type/common_types';

export default interface QueriedNotificationDTO {
  resource_type: NotificationResourceType;
  entity_id: Id;
  actor_id: Id;
  notifier_id: Id;
  created_at: Date;
}
