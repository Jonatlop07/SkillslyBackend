import { CreateNotificationDTO } from '@application/api/http-rest/http-dto/http_create_notification.dto'
import CreateNotificationInputModel from '@core/domain/use-case/input-model/create_notification.input_model'
import { NotificationResourceType } from '@core/domain/entity/notification_resource_type.enum'

export class CreateNotificationMapper {
  public static toInputModel(notification_details: CreateNotificationDTO): CreateNotificationInputModel {
    const {
      resource_type,
      entity_id,
      actor_id,
      notifier_ids
    } = notification_details;
    return {
      notification_details: {
        resource_type: resource_type as NotificationResourceType,
        entity_id,
        actor_id,
        notifier_ids
      }
    };
  }
}
