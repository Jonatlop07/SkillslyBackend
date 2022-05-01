import { Module } from '@nestjs/common'
import { NotificationHandlerController } from './notification_handler.controller'
import { NotificationHandlerService } from './notification_handler.service'
import { NotificationHandlerGateway } from './notification_handler.gateway'

@Module({
  controllers: [NotificationHandlerController],
  providers: [NotificationHandlerService, NotificationHandlerGateway]
})
export class NotificationHandlerModule {}
