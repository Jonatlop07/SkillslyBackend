import { Id } from '@application/common/type/common_types';
import { NotificationResourceType } from './notification_resource_type.enum';

export default interface UserNotificationModel {
  resource_type: NotificationResourceType;
  entity_id: Id;
  actor_id: Id;
  notifier_id: Id;
  created_at: string;
}
