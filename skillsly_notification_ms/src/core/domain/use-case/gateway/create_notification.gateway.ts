import Create from '@core/common/persistence/create'
import NotificationDetails from '@core/domain/use-case/dto/notification_details'
import NotificationDTO from '@core/domain/use-case/dto/notification.dto'

export default interface CreateNotificationGateway extends Create<NotificationDetails, Array<NotificationDTO>> {}
