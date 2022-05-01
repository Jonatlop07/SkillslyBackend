import { NotificationResourceType } from '@application/service/notification/model/notification_resource_type.enum'
import { Id } from '@application/common/type/common_types'

export default interface NotificationDetailsModel {
  resource_type: NotificationResourceType;
  entity_id: Id;
  actor_id: Id;
  notifier_ids: Array<Id>;
}
